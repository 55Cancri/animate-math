import React, { Component, SyntheticEvent } from 'react'
import { throttle, debounce } from 'throttle-debounce'
import { connect } from 'react-redux'
import posed, { PoseGroup } from 'react-pose'
import axios from 'axios'
import HeaderRow from '@components/modals/select-school-modal/select-school-page/header-row'
import api from '@api'

interface Props {
  ownAiCode: string
  ownAiName: string
  loaned: any[]
  orderInfo: any
  onExitModal: () => any
}

interface State {
  school: string
  zipcode: string
  city: string
  state: string
  schoolResults: any[]
  errorMessage: string
  loading: boolean
  resolvedPromises: any[]
}

const ResultList = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 200,
    transition: { duration: 250 },
    staggerChildren: 10,
    beforeChildren: true
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 200 }
  }
})

const ResultItem = posed.div({
  enter: { opacity: 1, x: 0, transition: { duration: 500 } },
  exit: { opacity: 0, x: -100, transition: { duration: 10 } }
})

// partially applied function to make one call at a time
const makeRequestCreator = () => {
  let call
  return ({ ownAiCode, school, zipcode, city, state }) => {
    if (call) {
      call.cancel('Only one request allowed at a time.')
    }
    call = axios.CancelToken.source()

    return api.invoicing.getSchoolList(
      {
        ownAiCode,
        school,
        zipcode,
        city,
        state
      },
      call
    )
  }
}

const callAndCancelPrevious = makeRequestCreator()

export class SelectSchoolPage extends Component<Props, State> {
  state = {
    school: '',
    zipcode: '',
    city: '',
    state: '',
    loading: false,
    errorMessage: '',
    schoolResults: [],
    resolvedPromises: []
  }

  onKeyPress = e => {
    if (e.key === 'Enter') return this.onSubmit(e)
  }

  onSelectSchool = (e: SyntheticEvent): void => {
    const { id } = e.target as HTMLButtonElement
    const { schoolResults } = this.state
    const { loaned: schoolsLoanedTo, onExitModal, orderInfo } = this.props
    const { testsByGrade } = orderInfo
    const byAicode = ({ aiCode }) => aiCode === id
    const school = schoolResults.find(byAicode)

    const addedSchool = {
      ...school,
      schoolName: school.schoolName
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' '),
      quantity: 0
    }

    const schoolList = [...schoolsLoanedTo, addedSchool]
    const totalTest = testsByGrade.reduce(
      (accumulator, { testsOrdered }) => accumulator + testsOrdered,
      0
    )
    return onExitModal()
  }

  // submit school search query
  onSubmit = async (e: SyntheticEvent): Promise<any> => {
    // extract values from state
    const {
      school,
      zipcode,
      city,
      state: selectedState,
      resolvedPromises: rps
    } = this.state
    const { loaned, ownAiCode, ownAiName } = this.props

    const shortLengthMessage = 'School name must be at least 3 characters long'
    const searchedOwnSchoolMessage =
      'You have searched for your school’s AI code or school name.  You cannot indicate that you loaned tests to your own school.  Please update your search criteria and try again.'
    const blankFieldsMessage = 'You must enter criteria to search for.'

    if (
      school.length === 0 &&
      city.length === 0 &&
      zipcode.length === 0 &&
      selectedState === ''
    )
      return this.setState({ errorMessage: blankFieldsMessage })
    if (school.length > 0 && school.length < 3)
      return this.setState({ errorMessage: shortLengthMessage })
    else if (
      school === ownAiCode ||
      school.toLowerCase() === ownAiName.toLowerCase()
    )
      return this.setState({ errorMessage: searchedOwnSchoolMessage })
    else this.setState({ loading: true, errorMessage: '' })

    const state = selectedState === 'all' ? '' : selectedState

    try {
      const results = await callAndCancelPrevious({
        ownAiCode,
        school,
        zipcode,
        city,
        state
      })

      const errorMessage = this.getErrorMessage(results)

      const { body } = results

      // filter results based on pre existing selections
      const schoolResults = body.filter(
        ({ schoolName: sn_1, aiCode: ai_1 }) =>
          !loaned.some(
            ({ schoolName: sn_2, aiCode: ai_2 }) =>
              sn_1 === sn_2 || ai_1 === ai_2
          )
      )

      return this.setState({
        errorMessage,
        schoolResults,
        loading: false,
        resolvedPromises: []
      })
    } catch (err) {
      console.log(err)

      if (axios.isCancel(err)) {
        console.error(`Cancelling previous request: ${err.message}`)
      }
    }

    return false
  }

  // should debounce (delay) api call for 1 second after user stops typing
  startSearchDebounce = debounce(1000, this.onSubmit)

  // should ... ?
  startSearchThrottle = throttle(750, this.onSubmit)

  // updates local state based on element
  onChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement
    this.setState({ [name]: value } as object)
    if (value.length > 3 && value.length < 5) {
      return this.startSearchThrottle(e)
    } else if (value.length > 2) {
      return this.startSearchDebounce(e)
    }
    return false
  }

  getErrorMessage = ({ message, body: results }) => {
    const tooManyResultsMessage =
      'Additional criteria will be required to get results'
    const greaterThan50Message =
      'We found more than 50 results. The first 50 are displayed here. Please refine your search to see additional results.'

    if (message === tooManyResultsMessage) return tooManyResultsMessage
    if (results.length > 50) return greaterThan50Message

    return ''
  }

  render = () => {
    const {
      loading,
      schoolResults,
      school,
      zipcode,
      city,
      state,
      errorMessage
    } = this.state
    const { onExitModal } = this.props
    const payload = { school, zipcode, city, state }
    return (
      <div />
      // <ModalWrapper className="select-school-page">
      //   <ModalHeader>
      //     <CloseButton onClick={onExitModal} />
      //     <h4>Search for schools</h4>
      //   </ModalHeader>
      //   <ModalBody>
      //     <HeaderRow
      //       payload={payload}
      //       onChange={this.onChange}
      //       onKeyPress={this.onKeyPress}
      //       onSubmit={this.onSubmit}
      //     />
      //     <main>
      //       {errorMessage && <p className="make-red">{errorMessage}</p>}
      //       {loading && (
      //         <div
      //           style={{
      //             display: 'grid',
      //             width: '100%',
      //             marginTop: 15,
      //             marginBottom: 15
      //           }}
      //         >
      //           <div
      //             role="progress-bar"
      //             aria-valuetext="Loading…"
      //             className="cb-loader cb-loader-blue cb-loader-lg"
      //             style={{ justifySelf: 'center', alignSelf: 'center' }}
      //           />
      //         </div>
      //       )}
      //       <PoseGroup>
      //         {!loading && (
      //           <ResultList key="results-list" className="school-results-list">
      //             {schoolResults.map(
      //               ({ aiCode, schoolName, schoolAddress }) => (
      //                 <ResultItem key={aiCode} className="school-result">
      //                   <h3 className="school-name">{schoolName}</h3>
      //                   <p className="school-aicode">{aiCode}</p>
      //                   <p className="school-address">{schoolAddress}</p>
      //                   <Button
      //                     id={aiCode}
      //                     className="add-school"
      //                     onClick={this.onSelectSchool}
      //                   >
      //                     Add
      //                     </Button>
      //                 </ResultItem>
      //               )
      //             )}
      //           </ResultList>
      //         )}
      //       </PoseGroup>
      //     </main>
      //   </ModalBody>
      // </ModalWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ownAiCode: state.invoice.aiCode,
  ownAiName: state.invoice.aiName,
  orderInfo: state.invoice.orderInfo,
  loaned: state.invoice.loaned
})

export default connect(mapStateToProps)(SelectSchoolPage)
