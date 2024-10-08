import { EntityValidationError } from "@/shared/errors/entity-validation.error";
import { IUserEntity, UserEntity } from "../../user.entity";
import { UserEntityDataBuilder } from "../../../__tests__/helpers/user-data-builder";

describe('Entity User', () => {
  let sut: UserEntity
  let props: IUserEntity

  beforeEach(() => {
    props = UserEntityDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Should instantiate the user class', () => {
    expect(sut).toBeInstanceOf(UserEntity)
  });

  it('There should be an error in the first name', () => {
    expect(() => new UserEntity(UserEntityDataBuilder({
      firstName: 15 as any
    }))).toThrow(EntityValidationError)
  });

  it('There should be an error in the lastName', () => {
    expect(() => new UserEntity(UserEntityDataBuilder({
      lastName: 15 as any,
    }))).toThrow(EntityValidationError)
  });

  it('There should be an error in the email', () => {
    expect(() => new UserEntity(UserEntityDataBuilder({
      email: 15 as any,
    }))).toThrow(EntityValidationError)
  });

  //Testando set methods
  it('Should change the password_hash with the method set password_hash', () => {
    const newPassword = 'Testeaaaa123@'

    sut.password_hash = newPassword

    expect(sut.password_hash).toBe(newPassword)
  })

  it('Should change the email with the method set email', () => {
    const newEmail = 'teste@gmail.com'
    sut.email = newEmail
    expect(sut.email).toBe(newEmail)
  })

  it('Should change the lastName with the method set lastName', () => {
    const newlastName = 'Leonardo da Silva Castilho'
    sut.lastName = newlastName
    expect(sut.lastName).toBe(newlastName)
  })

  it('Should change the first name with the method set firstName', () => {
    const newFirstName = 'Anderson'
    sut.firstName = newFirstName
    expect(sut.firstName).toBe(newFirstName)
  })

});
