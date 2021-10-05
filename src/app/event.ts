export class Event {

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public type: string,
    public priority: number,
    public relatedEvents: number[]
  ) {  }

}