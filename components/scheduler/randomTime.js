import moment from "moment";

export default function randomTime(timeArr) {
  console.log(timeArr, "from randomTime");
  const steps = [0, 15, 30, 45];

  const random = timeArr[Math.floor(Math.random() * timeArr.length)];

  const randomStep = steps[Math.floor(Math.random() * steps.length)];

  const newTime = moment(random)
    .add(randomStep, "m")
    .format();
  console.log(newTime);

  return newTime;
}
