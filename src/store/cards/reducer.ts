import { Card } from 'models/card'

export type State = Array<Card>

type Action = any

const initialState: State = []

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}
