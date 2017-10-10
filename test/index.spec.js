"use strict";
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const md5 = require('../index');

describe('index.js', () => {
    it('should export a function', function () {
        md5.should.be.a('function');
    });
    describe('md5()', () => {
        let testFile = 'test/res/md5.txt';
        it('should return a promise', async () => {
            let promise = md5(testFile);
            promise.should.be.a('promise');
            await promise;
        });
        it('should return correct md5 value', async () => {
            let value = await md5(testFile);
            value.should.be.a('string');
            value.should.be.equal('d189393257189a1c3b2be3a72cfe0ef6')
        });
        it('should rejected when file not exist', async () => {
            await md5('notexist.txt').should.be.rejectedWith('文件不存在');
        });
    })
});