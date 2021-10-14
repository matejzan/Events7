export class Event7 {
  constructor(
    readonly description: string, 
    readonly id: number, 
    readonly name: string, 
    readonly priority: number, 
    readonly related_events: Array<number>,
    readonly type: string
  ) {}
}