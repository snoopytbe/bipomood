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
      enervement
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listMoodss = /* GraphQL */ `
  query ListMoodss(
    $filter: ModelMoodsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoodss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        deprime
        fatigue
        angoisse
        enervement
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
