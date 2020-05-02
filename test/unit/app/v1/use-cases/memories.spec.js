'use strict';

const { expect } = require('chai');
const { createSandbox } = require('sinon');

const Memories = require('../../../../../app/v1/use-cases/memory');

const sbox = createSandbox();

describe('[APP - V1 - USE CASES] - Memories', () => {
  it('expect return an object', () => {
    const memories = Memories({
      aws: null,
      logger: null,
      slugify: null, 
      memoriesRepository: null,
    });

    expect(memories).to.be.a('object');
    expect(memories).to.have.property('createMemory');
    expect(memories).to.have.property('listMemories');
    expect(memories).to.have.property('findMemory');
  });

  context('createMemory call', () => {
    const slugify = sbox.stub();
    const onSuccess = sbox.stub();
    const onError = sbox.stub();
    const logger = {
      error: sbox.stub(),
    };
    const memoriesRepository = {
      insertOne: sbox.stub(),
    };
    const aws = {
      upload: sbox.stub(),
    };
    const dependencies = {
      aws,
      logger,
      slugify,
      memoriesRepository,
    };
    const memory = {
      name: 'Name Teste',
      picture: 'data:image\/jpeg;base64,dGVzdGUgZGUgaW1hZ2VtIGNvbW8gYmFzZSwgbWFzIMOpIHVtYSBzdHJpbmc='
    };

    const resultDBops = {
      _id: '793d093611d82d910dfb3657',
    };

    beforeEach(async () => {
      slugify.returns('name-teste');
      aws.upload.resolves('http://s3.exemple');
      memoriesRepository.insertOne.resolves({ ops: [resultDBops] });

      const { createMemory } = Memories(dependencies);
      await createMemory({
        onError,
        onSuccess,
        memory,
      });
    });

    it('expect slugify be called string with memory name', () => {
      const result = slugify;
      const [args] = result.args[0];
      expect(result.called).to.be.true;
      expect(args).to.be.a('string');
      expect(args).to.be.equal(memory.name);
    });

    it('expect aws updload be called', () => {
      expect(aws.upload.called).to.be.true;
    });

    it('expect 1º param be a string and 2º param be an Uint8Array from awsService.upload call', () => {
      const [firstParam, secondParam] = aws.upload.args[0];
      expect(firstParam).to.be.a('string');
      expect(secondParam).to.be.an('Uint8Array');
    });

    it('expect memoriesRepository be called', () => {
      expect(memoriesRepository.insertOne.called).to.be.true;
    });

    it('expect memoriesRepository be called with object', () => {
      const result = memoriesRepository.insertOne;
      const [params]= result.args[0];
      expect(result.called).to.be.true;
      expect(params).to.be.an('object');
    });

    it('expect onSuccess be called', () => {
      expect(onSuccess.called).to.be.true;
    });

    it('expect firstParam from onSuccess call be a 201 number', () => {
      const [firstParam] = onSuccess.args[0];
      expect(firstParam).to.be.a('number');
      expect(firstParam).to.be.equal(201);
    });

    it('expect secondParam from onSuccess call be a object with id property', () => {
      const [, secondParam] = onSuccess.args[0];
      expect(secondParam).to.be.a('object');
      expect(secondParam).to.have.property('_id');
      expect(secondParam._id).to.be.equal(resultDBops._id);
    });
  });

  context('listMemories call', () => {
    const onSuccess = sbox.stub();
    const onError = sbox.stub();
    const logger = {
      error: sbox.stub(),
    };
    const memoriesRepository = {
      find: sbox.stub(),
    };

    const dependencies = {
      aws: null,
      slugify: null,
      logger,
      memoriesRepository,
    };

    const resultDBops = {
      _id: '793d093611d82d910dfb3657',
    };

    beforeEach(async () => {
      memoriesRepository.find.resolves([resultDBops]);

      const { listMemories } = Memories(dependencies);
      await listMemories({
        onError,
        onSuccess,
      });
    });

    it('expect memoriesRepository find be called', () => {
      expect(memoriesRepository.find.called).to.be.true;
    });

    it('expect empty object from memoriesRepository find call', () => {
      const [firstParam] = memoriesRepository.find.args[0];
      expect(firstParam).to.be.an('object');
      expect(firstParam).to.be.empty;
    });

    it('expect onSuccess be called', () => {
      expect(onSuccess.called).to.be.true;
    });

    it('expect firstParam from onSuccess call be a 201 number', () => {
      const [firstParam] = onSuccess.args[0];
      expect(firstParam).to.be.a('number');
      expect(firstParam).to.be.equal(200);
    });

    it('expect secondParam from onSuccess call be a object with memories property as an array', () => {
      const [, secondParam] = onSuccess.args[0];
      expect(secondParam).to.be.a('object');
      expect(secondParam).to.have.property('memories');
      expect(secondParam.memories).to.be.an('array');
    });
  });

  context('findMemory call', () => {
    const onSuccess = sbox.stub();
    const onError = sbox.stub();
    const logger = {
      error: sbox.stub(),
    };
    const memoriesRepository = {
      find: sbox.stub(),
    };

    const dependencies = {
      aws: null,
      slugify: null,
      logger,
      memoriesRepository,
    };

    const resultDBops = {
      _id: '793d093611d82d910dfb3657',
    };

    const memoryId = {
      _id: {}
    };

    beforeEach(async () => {
      memoriesRepository.find.resolves([resultDBops]);

      const { findMemory } = Memories(dependencies);
      await findMemory({
        memoryId,
        onError,
        onSuccess,
      });
    });

    it('expect memoriesRepository find be called', () => {
      expect(memoriesRepository.find.called).to.be.true;
    });

    it('expect object with _id property from memoriesRepository find call', () => {
      const [firstParam] = memoriesRepository.find.args[0];
      expect(firstParam).to.be.an('object');
      expect(firstParam).to.have.property('_id');
    });

    it('expect onSuccess be called', () => {
      expect(onSuccess.called).to.be.true;
    });

    it('expect firstParam from onSuccess call be a 201 number', () => {
      const [firstParam] = onSuccess.args[0];
      expect(firstParam).to.be.a('number');
      expect(firstParam).to.be.equal(200);
    });

    it('expect secondParam from onSuccess call be a object with memories property as an array', () => {
      const [, secondParam] = onSuccess.args[0];
      expect(secondParam).to.be.a('object');
      expect(secondParam).to.have.property('_id');
      expect(secondParam._id).to.be.a('string');
    });

    it('expect onError be called with 404 and object message for empty array from memoriesRepository find call', 
      async () => {
        memoriesRepository.find.resolves([]);

        const { findMemory } = Memories(dependencies);
        await findMemory({ memoryId, onError, onSuccess });

        const [firstParam, secondParam] = onError.args[0];

        expect(onError.called).to.be.true;
        expect(firstParam).to.be.a('number');
        expect(firstParam).to.be.equal(404);
        expect(secondParam).to.be.an('object')
        expect(secondParam).to.have.property('message');
        expect(secondParam.message).to.be.equal('Memory not found');
      });
  });
});
