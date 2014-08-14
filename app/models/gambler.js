'use strict';

function Gambler(g){
  this.name = g.name;
  this.spouse = g.spouse;
  this.photo = g.photo;
  this.cash = g.cash;
  this.assets = g.assets;
  this.results = g.results;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

module.exports = Gambler;

