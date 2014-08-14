/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'gambler-test';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var g = new Gambler({name:'bob', spouse:{name:'sara', photo:'sara.jpg'}, photo:'bob.jpg', cash:1000, assets:[{name:'ring', photo:'ring.jpg', value:5000}, {name:'watch', photo:'watch.jpq', value:1000}], results:{wins:5, loses:3}});
      expect(g).to.be.instanceof(Gambler);
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });
});

