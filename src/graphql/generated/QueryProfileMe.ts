/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProfileMe
// ====================================================

export interface QueryProfileMe_me_role {
  __typename: "UsersPermissionsMeRole";
  name: string;
}

export interface QueryProfileMe_me {
  __typename: "UsersPermissionsMe";
  id: string;
  username: string;
  email: string;
  role: QueryProfileMe_me_role | null;
  blocked: boolean | null;
}

export interface QueryProfileMe {
  me: QueryProfileMe_me | null;
}
