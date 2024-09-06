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


  //Testando set methods
  it('Should change the password with the method set password', () => {
    const newPassword = '123456'
    sut.password = newPassword
    expect(sut.password).toBe(newPassword)
  })

  it('Should change the email with the method set email', () => {
    const newEmail = 'teste@gmail.com'
    sut.email = newEmail
    expect(sut.email).toBe(newEmail)
  })

  it('Should change the surname with the method set surname', () => {
    const newSurname = 'Leonardo da Silva Castilho'
    sut.surname = newSurname
    expect(sut.surname).toBe(newSurname)
  })

  it('Should change the first name with the method set firstName', () => {
    const newFirstName = 'Anderson'
    sut.firstName = newFirstName
    expect(sut.firstName).toBe(newFirstName)
  })


});
