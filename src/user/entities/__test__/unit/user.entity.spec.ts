import { EntityValidationError } from "@/shared/errors/entity-validation.error";
import { IUserEntity, UserEntity } from "../../user.entity";
import { UserDataBuilder } from "../../../__tests__/helpers/user-data-builder";

describe('Entity User', () => {
  let sut: UserEntity
  let props: IUserEntity

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Should instantiate the user class', () => {
    expect(sut).toBeInstanceOf(UserEntity)
  });

  it('There should be an error in the first name', () => {
    expect(() => new UserEntity(UserDataBuilder({
      firstName: 15 as any
    }))).toThrow(EntityValidationError)
  });

  it('There should be an error in the surname', () => {
    expect(() => new UserEntity(UserDataBuilder({
      surname: 15 as any,
    }))).toThrow(EntityValidationError)
  });

  it('There should be an error in the email', () => {
    expect(() => new UserEntity(UserDataBuilder({
      email: 15 as any,
    }))).toThrow(EntityValidationError)
  });
});
