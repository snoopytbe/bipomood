/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMoods = /* GraphQL */ `
  query GetMoods($id: ID!) {
    getMoods(id: $id) {
      id
      date
      deprime
      fatigue
      angoisse
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listMoods = /* GraphQL */ `
  query ListMoods(
    $filter: ModelMoodsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        deprime
        fatigue
        angoisse
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
