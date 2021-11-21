/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMoods = /* GraphQL */ `
  mutation CreateMoods(
    $input: CreateMoodsInput!
    $condition: ModelMoodsConditionInput
  ) {
    createMoods(input: $input, condition: $condition) {
      id
      date
      deprime
      fatigue
      angoisse
      enervement
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMoods = /* GraphQL */ `
  mutation UpdateMoods(
    $input: UpdateMoodsInput!
    $condition: ModelMoodsConditionInput
  ) {
    updateMoods(input: $input, condition: $condition) {
      id
      date
      deprime
      fatigue
      angoisse
      enervement
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMoods = /* GraphQL */ `
  mutation DeleteMoods(
    $input: DeleteMoodsInput!
    $condition: ModelMoodsConditionInput
  ) {
    deleteMoods(input: $input, condition: $condition) {
      id
      date
      deprime
      fatigue
      angoisse
      enervement
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
