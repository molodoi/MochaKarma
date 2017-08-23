var chai = require('chai')
var expect = chai.expect
var chaiAsPromised = require("chai-as-promised");
var Social = require('../lib/Social')
var sinon = require('sinon')
var Promise = require('promise')

chai.use(chaiAsPromised);

/*
 * Test unitaire avec Mocha
 */

//Les Spy permettent d'espionner un objet (plus précisément une méthode de l'objet) et de vérifier qu'elle a bien été appelée avec les bons arguments.
//Les Stubs permettent de modifier une fonction pour changer sa manière de fonctionner
//Les Mocks (Reunion des Spy et Stub) sont de fausses méthodes (comme les espions) avec un comportement prédéfini (comme les stubs) et avec des attentes préprogrammées. 

describe('Social', function(){

    var url = "http://ticme.fr"

    it('Should have twitter_url', function(){
      expect(Social).to.have.property('twitter_url')
    })

    it('Should have facebook_url', function(){
        expect(Social).to.have.property('facebook_url')
    })

    describe('#getTwitterCount', function(){

        it('Shoul be a function', function(){
            expect(Social.getTwitterCount).to.be.a('function')    
        })

        it('Should call callAPI', function(){
            //Spy
            sinon.spy(Social, 'callAPI')
            Social.getTwitterCount(url)
            expect(Social.callAPI.withArgs(Social.twitter_url + url).calledOnce).to.be.true
            Social.callAPI.restore()
        })

        // done pour gérer l'asynchrone et dire à mocha de continuer
        it('should return count', function(){
            //Stub
            var stub = sinon.stub(Social, 'callAPI')
            stub.returns({count: 3})
            expect(Social.getTwitterCount(url)).to.eventually.be.equal(3)
            Social.callAPI.restore()
        })

    })

    describe('#getFacebookCount', function(){
        it('should return shares', function(){
            //Mock
            var mock = sinon.mock(Social)
            mock.expects('callAPI')
              .once()
              .withArgs(Social.facebook_url + url)
              .returns({shares: 10})
            expect(Social.getFacebookCount(url)).to.eventually.be.equal(3)
            mock.verify()
            mock.restore()
        })  
    })
})