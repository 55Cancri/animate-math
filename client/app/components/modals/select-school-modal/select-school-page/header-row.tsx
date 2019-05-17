import React, { SFC, SyntheticEvent } from 'react'

interface Props {
  payload: any
  onChange: (e: SyntheticEvent) => any
  onKeyPress: (e: any) => any
  onSubmit: (e: SyntheticEvent) => any
}

export const HeaderRow: SFC<Props> = ({
  onChange,
  onKeyPress,
  onSubmit,
  payload: { school, zipcode, city, state }
}) => (
  <form onSubmit={onSubmit} className="ssm-form">
    {/* <div className="form-group">
      <label>School</label>
      <div className="cb-input-search cb-input-state">
        <Input
          inputType="text"
          inputName="school"
          placeholder="School Name, AI Code"
          value={school}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <i className="cb-glyph cb-search" aria-hidden="true" />
      </div>
    </div>

    <div className="form-group">
      <label>City</label>
      <Input
        inputName="city"
        inputType="text"
        placeholder="City"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={city}
      />
    </div>

    <div className="form-group">
      <label>State (if in U.S.)</label>
      <Select
        selectName="state"
        className="replaced"
        options={states}
        onChange={onChange}
        value={state}
      />
    </div>

    <div className="form-group">
      <label>Zip/Postal code</label>
      <Input
        value={zipcode}
        inputType="text"
        inputName="zipcode"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>

    <div className="button-group">
      <Button color="blue" onClick={onSubmit}>
        Search
      </Button>
    </div> */}
  </form>
)

export default HeaderRow
