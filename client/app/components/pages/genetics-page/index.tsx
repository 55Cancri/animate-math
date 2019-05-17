import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect
} from "react";
import posed, { PoseGroup } from "react-pose";
import { makeArray, randomNumber } from "../../../helpers";
// import UsersList from './users-list'
// import Lobby from './lobby'

const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

// generate a new character
const randomChar = () => {
  const asciiLow = 63;
  const asciiHigh = 122;
  const randomAscii = Math.floor(
    Math.random() * (asciiHigh - asciiLow) + asciiLow
  );

  // if it equals the ? symbol, convert to a period
  const withPeriod = randomAscii === 63 ? 46 : randomAscii;

  // if it equals the @ symbol, convert to a space
  const withSpace = withPeriod === 64 ? 32 : withPeriod;

  // get the character from the ascii table
  return String.fromCharCode(withSpace);
};

// normalize any number between 0 and 1
const normalize = (val, min, max) => (val - min) / (max - min);

// create an array of random characters (genes)
const createDNA = num =>
  // [a, s, d, w, e, i, b, a, j, s, d]
  makeArray(num).map(randomChar);

// add mutations to each offspring
const mutate = (child, mutationRate, rando) => {
  const { genes: initialGenes } = child;
  const genes = initialGenes.map(gene => {
    const num = Math.random();

    console.log("RAND_NUM: ", num, "MUTATION_RATE: ", mutationRate);

    // if the random decimal is less than the mutation rate, create a mutation
    if (num < mutationRate) {
      return randomChar();
    }

    // otherwise just return the current character
    return gene;
  });

  // return the child with the mutated genes
  return { ...child, genes };
};

// take half from mom and half from dad. The member becomes the new child
const crossOver = (momGenes, dadGenes) => {
  const newGenes = createDNA(momGenes.length);
  const max = newGenes.length;
  const midPoint = Math.floor(randomNumber(0, max));

  const firstHalf = momGenes.slice(0, midPoint);
  const secondHalf = dadGenes.slice(midPoint);
  // console.log("FIRST HALF", firstHalf);
  // console.log("SECOND HALF", secondHalf);
  // console.log("MID POINT: ", midPoint);

  // create a child by combining the genes of both parents
  const genes = [...firstHalf, ...secondHalf];
  return { fitness: 0, genes };
};

// [a, s, d, w, e, i, b, a, j, s, d] -> asdweibajsd
// const getPhrase = genesArr => genesArr.join("");

// step 2: perform natural selection
const calculateFitness = (targetPhrase, genes) => {
  // iterate over every character in the phrase
  const score = genes.reduce((store, gene, i) => {
    // if the particular char in the genes array matches the char in the target phrase,
    if (gene === targetPhrase.charAt(i)) {
      // increase the score
      return store + 1;
    }
    return store;
  }, 0);

  // determine the fitness of the target by dividing the number of characters by the length
  // 9 out of 10 characters correct results in a 90% fitness
  const fitness = score / targetPhrase.length;

  // improved fitness score. Increase the frequency based on the number of correct
  // 3 characters correct vs 4 characters correct: 3^2 = 9 vs 4^2 = 16
  return fitness * fitness;
};

const getAverageFitness = population => {
  const score = population.reduce((store, { fitness }) => store + fitness, 0);
  return score / population.length;
};

// ✅ 1. initialize a population
const createPopulation = (targetPhrase, populationMax) => {
  const newPopulation = makeArray(populationMax).map(() => {
    // initialize member dna to random strings
    const genes = createDNA(targetPhrase.length);

    // determine the fitness of this member
    const fitness = calculateFitness(targetPhrase, genes);

    // add member to population
    return { genes, fitness };
  });

  // console.log("CREATED POPULATION: ", newPopulation);

  // save the population in the store
  return newPopulation;
};

// create the mating pool
const naturalSelection = (recordFitness, population) => {
  // get the the highest fitness level
  const highestFitness = population.reduce(
    (score, { fitness }) => (fitness > score ? fitness : score),
    0
  );
  // const highestFitness = population.reduce((score, { fitness }) => {
  //   // store is always the member with the highest fitness
  //   if (fitness > score) return fitness;
  //   return score;
  // }, recordFitness);

  // why does this go down?
  // console.log("HIGHEST FITNESS: ", highestFitness);

  // add a member to the pool based on their fitness
  const matingPool = population.reduce((pool, member) => {
    const { fitness } = member;

    // will give a decimal between 0 and 1 between this members fitness and the highest fitness
    const normalized = normalize(fitness, 0, highestFitness);

    // convert to a percentage: -> 35, 70, 80
    const freq = Math.floor(normalized * 100);

    const entries = freq > 0 ? makeArray(freq).fill(member) : [];

    // console.log(
    //   `with max fitness of ${highestFitness}, and an actual fitness of ${fitness}, then normalized to ${normalized}, multiplied by 100 for array frequency ${freq}, should yield ${
    //     entries.length
    //   } entries.`
    // );

    // return the updated mating pool
    const result = [...pool, ...entries];
    return result;
  }, []);

  // otherwise return the initial mating pool
  return { matingPool, highestFitness };
};

const generate = (
  targetPhrase,
  mutationRate,
  matingPool,
  population,
  rando
) => {
  const newPopulation = population.map((member, i) => {
    // randomly select two members from the mating pool
    const max = matingPool.length - 1;
    const a = randomNumber(0, max);
    const b = randomNumber(0, max);

    const mom = matingPool[a];
    const dad = matingPool[b];

    // create a new child by performing genetic crossover
    const offspring = crossOver(mom.genes, dad.genes);

    // update the population after applying the mutations to the child
    const child = mutate(offspring, mutationRate, rando);

    const fitness = calculateFitness(targetPhrase, child.genes);

    return { ...child, fitness };
  });

  // update the population with the update child
  return newPopulation;
};

const evaluate = population => {
  const perfectScore = 1;
  const { record, genes } = population.reduce(
    (store, { genes, fitness }) => {
      if (fitness > store.record) {
        return { record: fitness, genes };
      }

      return store;
    },
    { record: 0, genes: [] }
  );

  const isFinished = record === perfectScore;
  const isBestPhrase = genes.join("");

  return { isFinished, isBestPhrase };
};

export const DashboardPage: FunctionComponent = (): ReactElement => {
  const targetPhrase = "To be or not to be, that is the question.";
  const populationMax = 150;
  const mutationRate = 0.01;

  // initialize state
  const [isEvolving, setIsEvolving] = useState(false);
  const [population, setPopulation] = useState([]);
  const [generations, addGeneration] = useState(0);
  const [averageFitness, setAverageFitness] = useState(0);
  const [highestFitness, setHighestFitness] = useState(0);
  const [bestPhrase, setBestPhrase] = useState("");
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [oneMillionRandos, setOneMillionRandos] = useState([]);

  useEffect(() => {
    if (isEvolving === true) {
      console.log("ran once only.");
      // ✅ create a population of random strings and determine each members fitness
      const newPopulation = createPopulation(targetPhrase, populationMax);
      setPopulation(newPopulation);

      const randies = makeArray(1e4).fill(Math.random());
      setOneMillionRandos(randies);
      console.log("DONE!");
    }
  }, [isEvolving]);

  useEffect(() => {
    if (isEvolving === true && population.length > 0 && finished === false) {
      // should to look more and more like the target each time
      // population.map(({ genes }, i) => {
      //   if (i === 0) {
      //     console.log("FIRST MEMBER: ", genes.join(""));
      //   }
      // });
      const rando = oneMillionRandos[index];

      // generate the mating pool
      const {
        highestFitness: record,
        matingPool: nextMatingPool
      } = naturalSelection(highestFitness, population);

      // create next generation
      const nextGeneration = generate(
        targetPhrase,
        mutationRate,
        nextMatingPool,
        population,
        rando
      );

      const { isFinished, isBestPhrase } = evaluate(nextGeneration);

      setIndex(index + 1);
      setHighestFitness(record);
      setPopulation(nextGeneration);
      addGeneration(generations + 1);

      // update the fitness average
      const fitness = getAverageFitness(nextGeneration);
      setAverageFitness(fitness);

      setBestPhrase(isBestPhrase);
      setFinished(isFinished);

      // console.log("population", population);
      // console.log("AVG FITNESS: ", fitness);
    }

    return () => {};
  }, [population, averageFitness, bestPhrase, finished]);

  return (
    <PoseGroup flipMove={false}>
      <Div
        // <div
        key="dashboard"
        className="dashboard"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "25px 50px"
        }}>
        <div>
          <button onClick={() => setIsEvolving(!isEvolving)}>
            {!isEvolving === true ? "Start :)" : "Stop! :O"}
          </button>
          <h3>
            Best phrase: <br />
            {bestPhrase}
          </h3>
          <p>
            <b>total generations</b>:<br /> {generations}{" "}
          </p>
          <p>
            <b>average fitness</b>: <br /> {averageFitness.toFixed(2)}
          </p>
          <p>
            <b>total population</b>: <br /> {populationMax}
          </p>
          <p>
            <b>mutation rate</b>:<br /> {Math.floor(mutationRate * 100)}%
          </p>
        </div>
        <div>
          <h3>All phrases: </h3>
          {population.slice(0, 12).map(({ genes }) => (
            <p>{genes.join("")}</p>
          ))}
        </div>
        {/* </div> */}
      </Div>
    </PoseGroup>
  );
};

export default DashboardPage;
