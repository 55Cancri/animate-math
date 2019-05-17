import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useReducer,
  useEffect,
  SyntheticEvent
} from "react";
import posed, { PoseGroup } from "react-pose";
import { movieReviews } from "@seeds";
const movies = ["IV", "V", "VI", "I", "II", "III", "VII", "Rogue1", "Holiday"];
const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

export const KNNPage: FunctionComponent = (): ReactElement => {
  const { name, timestamp, ...person } = movieReviews[0];
  const initialState = {
    selectedPerson: person,
    scoredPeople: [],
    movies: movies.map(title => ({ title, rating: null })),
    predictions: []
  };

  //  k nearest neighbors
  const k = 5;

  // update local store
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SELECTED_PERSON":
        return { ...state, selectedPerson: action.value };

      case "SCORED_PEOPLE":
        return { ...state, scoredPeople: action.value };

      case "UPDATE_SELECTIONS":
        return { ...state, movies: action.value };

      case "PREDICTED_RATINGS":
        return { ...state, predictions: action.value };

      default:
        return state;
    }
  };

  // initialize local store
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveSelection = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLSelectElement;

    // discard name and timestamp property
    const { name, timestamp, ...reviews } = movieReviews.find(
      ({ name }) => name === value
    );

    // build the payload
    const payload = { type: "SELECTED_PERSON", value: reviews };

    // apply the updates
    dispatch(payload);
  };

  const updateSelections = (e: SyntheticEvent) => {
    const { id, value } = e.target as HTMLSelectElement;
    const movieUpdates = state.movies.map(movie => {
      const { title } = movie;
      if (title === id) {
        return { title, rating: Number(value) };
      }

      return movie;
    });

    const payload = { type: "UPDATE_SELECTIONS", value: movieUpdates };
    dispatch(payload);
  };

  const predictRatings = () => {
    const newUser = state.movies;
    const kNearest = findNearestNeighbors(newUser);

    // console.log("KN: ", kNearest);
    // console.log("MOVIES: ", state.movies);

    const weightedSums = state.movies
      // only keep the movies the user has not seen yet
      .filter(({ rating }) => Boolean(rating) === false)
      .reduce((score, { title }, i) => {
        const sum = kNearest.reduce((store, person) => {
          // get this users rating for this particular movie title
          const thisUsersRating = person[title];

          // if this user rated the movie,
          if (Boolean(thisUsersRating) === true) {
            // aggregate this nearest neighbors score
            return store + thisUsersRating;
          }

          // otherwise just skip the user
          return store;
        }, 0);

        const averageRating = (sum / k).toFixed(2);

        // each movie will get a sum that is the average of each knn
        return [...score, { title, sum: averageRating }];
      }, []);

    const payload = { type: "PREDICTED_RATINGS", value: weightedSums };
    dispatch(payload);
  };

  // get the distance in space between two sets of scores
  const euclideanDistance = (personOne, personTwo) => {
    const { distance } = [
      ...Object.entries(personOne),
      ...Object.entries(personTwo)
    ].reduce(
      (store, [key, value], i, array) => {
        // if the movie title does not exist,
        if (Boolean(store[key]) === false) {
          // and if the value is not null,
          if (Boolean(value) === true) {
            // then save it to the store
            return { ...store, [key]: value };
          }
        }

        // if the movie title does exist and the value is not null,
        if (Boolean(store[key]) === true && Boolean(value) === true) {
          // then calculate the distance between the people
          const square = Math.pow(Number(store[key]) - Number(value), 2);
          const distance = store.distance + square;
          return { ...store, distance, [key]: square };
        }

        // otherwise just return the store
        return store;
      },
      { distance: 0 }
    );

    // get the sqrt of the distance
    const sqrt = Math.sqrt(distance);

    // convert distance to be between 0 and 1
    const similarity = 1 / (1 + sqrt);

    return similarity;
  };

  // find the k nearest people who have similar movies tastes
  const findNearestNeighbors = userRatings => {
    const selectedPerson = userRatings.reduce((store, { title, rating }) => {
      return { ...store, [title]: rating };
    }, {});

    // score each person
    const peopleWithScores = movieReviews.map(otherPerson => {
      // get the similarity between two peoples sets of scores
      const similarity = euclideanDistance(selectedPerson, otherPerson);
      return { ...otherPerson, similarity };
    });

    // sort the scores from nearest to furthest
    const sortedScores = peopleWithScores
      .slice()
      .sort((a, b) => b.similarity - a.similarity);

    // return only the k most similar users
    return sortedScores.slice(0, k);
  };

  return (
    <PoseGroup flipMove={false}>
      <Div key="knn" className="knn">
        <h2>K-Nearest Neighbors</h2>
        {movies.map(title => (
          <div
            key={title}
            style={{
              display: "grid",
              gridTemplateColumns: "max-content max-content",
              gridColumnGap: 15,
              alignItems: "center"
            }}>
            <p style={{ margin: 0 }}>{title}</p>
            <select id={title} onChange={updateSelections}>
              <option value={null}>Not seen</option>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
            </select>
          </div>
        ))}
        {state.predictions.map(({ title, sum }) => (
          <p key={title} style={{ margin: 0 }}>
            {title}: {sum}
          </p>
        ))}
        <button onClick={predictRatings}>submit</button>
      </Div>
    </PoseGroup>
  );
};

export default KNNPage;
