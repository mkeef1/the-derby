'use strict';

var _ = require('lodash'),
  Mongo = require('mongodb');

function Gambler(g){
  this.name = g.name;
  this.spouse = g.spouse;
  this.photo = g.photo;
  this.cash = g.cash;
  this.assets = [];
  this.results = g.results;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = changePrototype(obj);
    cb(gambler);
  });
};

Gambler.prototype.removeAsset = function(name){
  var asset = _.remove(this.assets, function(a){
    return a.name === name;
  });
  this.cash += asset[0].value;
};
module.exports = Gambler;
//Private//

function changePrototype(obj){
  return _.create(Gambler.prototype, obj);
}
