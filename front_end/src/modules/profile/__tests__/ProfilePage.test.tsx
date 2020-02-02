import React from "react";
import ProfilePage from "../ProfilePage";
import { IUserContextState, UserStore } from "../../../context/user/userStore";
import { mount, render, shallow } from "../../../../configs/setupEnzyme";
import UserStoreMock from "../../../__mocks__/userStoreMock";
import { Session, User } from "../../../types";

const testUser: User = {
  username: "username",
  email: "email",
  password: "password",
  id: "id",
  authority: "ADMIN",
  country: "USA",
  state: "IA",
  firstName: "Name",
  lastName: "Last",
  phoneNumber: "1111111111",
  role: "ADMIN_ROLE",
  session: null
};

describe("<ProfilePage /> ", () => {
  it("should render sign up form.", function() {
    const mockState: IUserContextState = { user: null };

    const profilePage = shallow(
      <UserStoreMock state={mockState} dispatch={() => {}}>
        <ProfilePage />
      </UserStoreMock>
    );

    expect(profilePage.find("#signIn")).toBeDefined();
    expect(profilePage.find("#firstName")).toBeDefined();
    expect(profilePage.find("#lastName")).toBeDefined();
    expect(profilePage.find("#email")).toBeDefined();
    expect(profilePage.find("#phoneNumber")).toBeDefined();
    expect(profilePage.find("#password")).toBeDefined();
    expect(profilePage.find("#repeatPassword")).toBeDefined();
  });

  it("should render sign in form.", () => {
    const mockState: IUserContextState = {
      user: null
    };

    const profilePage = mount(
      <UserStoreMock state={mockState} dispatch={() => {}}>
        <ProfilePage />
      </UserStoreMock>
    );

    profilePage.find("button[id='signIn']").simulate("click");

    expect(profilePage.find("#signUp")).toBeDefined();
    expect(profilePage.find("#email")).toBeDefined();
    expect(profilePage.find("#password")).toBeDefined();
    expect(profilePage.find("#rememberMe")).toBeDefined();
  });

  it("should render profile form.", () => {
    const mockState: IUserContextState = {
      user: testUser
    };

    const profilePage = mount(
      <UserStoreMock state={mockState} dispatch={() => {}}>
        <ProfilePage />
      </UserStoreMock>
    );

    expect(profilePage.find("#signOut")).toBeDefined();
    expect(profilePage.find("#firstName")).toBeDefined();
    expect(profilePage.find("#lastName")).toBeDefined();
    expect(profilePage.find("#email")).toBeDefined();
    expect(profilePage.find("#phoneNumber")).toBeDefined();
  });
});