var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //position de repos à la maison
        const homePos = new RoomPosition(22, 18, 'W52S34');
        const target = homePos;
        //changer de salle
	    //const target = creep.pos.find(FIND_EXIT_TOP);
        if(target) {
            if(creep.moveTo(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            }
        }
        /*
        else{
             const restPos = new RoomPosition(24, 20, 'W52S34');
                creep.moveTo(restPos, {visualizePathStyle: {stroke: '#ffffff'}});
        }*/
	}
};

module.exports = roleScout;