var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('🚧repair');
	    }

	    if(creep.memory.repairing) {
	        var target = creep.pos.findClosestByPath(FIND_STRUCTURES,
	        {
	            filter:  (structure) => {
	                structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
	            }
	        });
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                const idleSpot = new RoomPosition(28,22,Game.spawns.Spawn1.room.name);
                creep.moveTo(idleSpot, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('idle');
            }
	    }
	    else {
	        var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleRepairer;