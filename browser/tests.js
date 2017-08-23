var expect = chai.expect;

it('multiply', function(){

    var $cont = $('<div></div>');
    $cont.append('Salut');
    expect($cont.text()).to.be.equal('Salut');
    //expect(1 * 2).to.be.equal(2); 7.30
});