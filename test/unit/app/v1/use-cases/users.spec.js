'use strict';

const { expect } = require('chai');
const { createSandbox } = require('sinon');

const Users = require('../../../../../app/v1/use-cases/users');

const sbox = createSandbox();

describe('[APP - V1 - USE CASES] - Users', () => {
  it('expect return an object', () => {
    const budget = Users({
      userRepository: null,
      cryptograph: null,
      jwt: null,
      mailService: null,
    });

    expect(budget).to.be.a('object');
    expect(budget).to.have.property('createUser');
    expect(budget).to.have.property('confirmAccount');
    expect(budget).to.have.property('login');
  });

  context('createUser call', () => {
    const userRepository = {
      insert: sbox.stub()
    };
    const cryptograph = {
      gen: sbox.stub(),
    };
    const jwt = {
      sign: sbox.stub()
    };
    const mailService = {
      welcome: sbox.stub(),
    };
    const onError = sbox.stub();
    const onSuccess = sbox.stub();

    const dependencies = {
      userRepository,
      cryptograph,
      jwt,
      mailService,
    };

    const password = 'test pass';
    const cryptoPassword = '7es7_p4ss';

    const user = {
      password,
      email: 'TEST@test',
    };

    const createdUser = {
      _id: 'a5a0232f7486cbc96c0014c3',
      ...user
    };

    const token = 'jwt.token.test';

    beforeEach(async () => {
      cryptograph.gen.resolves(cryptoPassword);
      userRepository.insert.resolves({
        ops: [createdUser]
      });
      jwt.sign.resolves(token);

      const { createUser } = Users(dependencies);

      await createUser({
        onError,
        onSuccess,
        user,
      });
    });

    afterEach(() => sbox.reset());

    it('expect cryptograph gen be caledd with user password', () => {
      const result = cryptograph.gen;
      const [args] = result.args[0];
      expect(result.called).to.be.true;
      expect(args).to.be.equal(password);
    });

    it('expect userRepository be called with an object', () => {
      const result = userRepository.insert;
      const [args] = result.args[0];
      expect(result.called).to.be.true;
      expect(args).to.be.an('object');
    });

    it('expect object from userRepository call has property password with encrypted pasword', () => {
      const [args] = userRepository.insert.args[0];
      expect(args).to.have.property('password');
      expect(args.password).to.be.equal(cryptoPassword);
    });

    it('expect object from userRepository call has property createdAt', () => {
      const [args] = userRepository.insert.args[0];
      expect(args).to.have.property('createdAt');
    });

    it('expect object from userRepository call has property updatedAt', () => {
      const [args] = userRepository.insert.args[0];
      expect(args).to.have.property('updatedAt');
    });

    it('expect object from userRepository call has property confirmed with false value', () => {
      const [args] = userRepository.insert.args[0];
      expect(args).to.have.property('confirmed');
      expect(args.confirmed).to.be.false;
    });

    it('expect object from userRepository call has property blocked with false value', () => {
      const [args] = userRepository.insert.args[0];
      expect(args).to.have.property('blocked');
      expect(args.blocked).to.be.false;
    });

    it('expect object from userRepository call has property email with lowerCase', () => {
      const [args] = userRepository.insert.args[0];
      expect(args).to.have.property('blocked');
      expect(args.email).to.be.equal(user.email.toLowerCase());
    });

    it('expect mailService welcome be called with a createdUser object', () => {
      const result = mailService.welcome;
      const [args] = result.args[0];
      expect(result.called).to.be.true;
      expect(args).to.be.an('object');
    });

    it('expect createdUser from mailService welcome has _id property', () => {
      const result = mailService.welcome;
      const [args] = result.args[0];
      expect(args).to.have.property('_id');
      expect(args._id).to.be.equal(createdUser._id);
    });

    it('expect jwt sign be called with an object and have property password', () => {
      const result = jwt.sign;
      const [args] = result.args[0];
      expect(result.called).to.be.true;
      expect(args).to.be.an('object');
      expect(args).to.have.property('password');
    });

    it('expect onSuccess be called with a number and object in second params', () => {
      const [statusCode, createdUser] = onSuccess.args[0];
      expect(onSuccess.called).to.be.true;
      expect(statusCode).to.be.a('number');
      expect(createdUser).to.be.a('object');
    });

    it('expect statusCode be equal 201', () => {
      const [statusCode] = onSuccess.args[0];
      expect(statusCode).to.be.equal(201);
    });

    it('expect createdUser be property jwt with token value', () => {
      const [,createdUser] = onSuccess.args[0];
      expect(createdUser).to.have.property('jwt');
      expect(createdUser.jwt).to.be.equal(token);
    });
  });

  context('confirmAccount call', () => {
    const userRepository = {
      updateOne: sbox.stub()
    };
    const jwt = {
      verify: sbox.stub()
    };

    const onError = sbox.stub();
    const onSuccess = sbox.stub();

    const token = 'dGVzdCB0byBjb3ZpdGltMTkgc3RyaW5nIHRva2Vu==';

    const dependencies = {
      userRepository,
      jwt,
    };

    const resultDBops = {
      ok: 1
    }

    beforeEach(async () => {
      jwt.verify.resolves({ _id: 'userToken' });
      userRepository.updateOne.resolves({ result: resultDBops });

      const { confirmAccount } = Users(dependencies);
      await confirmAccount({
        onError,
        onSuccess,
        token,
      });
    });

    it('expect jwt verify be called with a string from token parsed base64', () => {
      const result = jwt.verify;
      const [args] = result.args[0];
      expect(jwt.verify.called).to.be.true;
      expect(args).to.be.a('string');
      expect(args).to.be.equal(
        Buffer.from(token, 'base64').toString('utf8')
      );
    });

    it('expect userRepository updateOne be called with an object in 1º and 2º params', () => {
      const [firstParam, secondParam] = userRepository.updateOne.args[0];
      
      expect(userRepository.updateOne.called).to.be.true;
      expect(firstParam).to.be.an('object');
      expect(secondParam).to.be.an('object');
    });

    it('expect first param from updateOne call has key _id', () => {
      const [firstParam] = userRepository.updateOne.args[0];
      expect(firstParam).to.have.property('_id');
    })

    it('expect _id property from object in updateOne call be a string equal userToken', () => {
      const [args] = userRepository.updateOne.args[0];
      
      expect(userRepository.updateOne.called).to.be.true;
      expect(args._id).to.be.an('string');
      expect(args._id).to.be.equal('userToken');
    });

    it('expect second param from updateOne call has key $set', () => {
      const [, secondParam] = userRepository.updateOne.args[0];
      expect(secondParam).to.have.property('$set');
    })

    it('expect $set property from object in updateOne secoind call be a object with confirmed equal true', () => {
      const [,secondParam] = userRepository.updateOne.args[0];

      expect(userRepository.updateOne.called).to.be.true;
      expect(secondParam.$set).to.be.an('object');
      expect(secondParam.$set).to.have.property('confirmed');
      expect(secondParam.$set.confirmed).to.be.true;
    });

    it('expect onSuccess be called', () => {
      expect(onSuccess.called).to.be.true;
    });

    it('expect onSuccess params be a number and a object', () => {
      const [firstParam, secondParam] = onSuccess.args[0]; 
      expect(firstParam).to.be.a('number');
      expect(secondParam).to.be.a('object');
    });

    it('expect onSuccess firstParam equal 200', () => {
      const [firstParam] = onSuccess.args[0]; 
      expect(firstParam).to.be.equal(200);
    });

    it('expect onSuccess secondParam object have property ok with value 1', () => {
      const [,secondParam] = onSuccess.args[0]; 
      expect(secondParam).to.have.property('ok');
      expect(secondParam.ok).to.be.equal(1);
    });
  });

  context('login call', () => {
  });
});
