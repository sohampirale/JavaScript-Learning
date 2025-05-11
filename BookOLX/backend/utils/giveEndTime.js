function giveEndTime(durationInDays){
  const milliseconds=durationInDays*24*60*60*1000;
  const currTime = new Date();
  const endDate= new Date(currTime.getTime()+milliseconds);
}

export {giveEndTime};