require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleScout = require('role.scout');
var roleRepairer = require('role.repairer');
var roleLongDistanceHarvester = require('role.longdistancehavester');

const home = 'W5S34';

module.exports.loop = function () {
     //clear memory
     for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    if(Game.cpu.getUsed() > Game.cpu.tickLimit / 2) {
    console.log("Used half of CPU already!");
}
    //displays enegy available in the console
     for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    
var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
var longdistanceharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longdistanceharvester');
    console.log('LongDistanceHarvesters: ' + longdistanceharvesters.length);
    
var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    console.log('Defenders: ' + defenders.length);
var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    console.log('Scouts: ' + scouts.length);
var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);

var energy= Game.spawns['Spawn1'].room.energyCapacityAvailable

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        let creationAttemptOutput = Game.spawns['Spawn1'].spawnCustomCreep(energy, newName,'harvester');
        if (creationAttemptOutput == ERR_NOT_ENOUGH_ENERGY ){
            Game.spawns['Spawn1'].spawnCustomCreep(Game.spawns.Spawn1.room.energyAvailable, newName,'harvester');
        }
    } else if(longdistanceharvesters.length < 1) {
        var newName = 'LongDistanceHavester' + Game.time;
        console.log('Spawning new longdistanceharvester: ' + newName);
        Game.spawns['Spawn1'].spawnLongDistanceHarvester(energy,newName, 1,home,'W52S35',0);
    } else if(upgraders.length < 2) {
        var newName = 'Upgraders' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCustomCreep(energy, newName,'upgrader');
    }else if(repairers.length < 1) {
        var newName = 'Repairers' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCustomCreep(energy, newName,'repairer');
    }else if(builders.length < 2) {
        var newName = 'Builders' + Game.time;
        console.log('Spawning new builder: ' + newName);
       Game.spawns['Spawn1'].spawnCustomCreep(energy, newName,'builder');
    }else if(defenders.length < 2) {
        var newName = 'Defenders' + Game.time; 
        console.log('Spawning new defender: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,RANGED_ATTACK,ATTACK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'defender'}});
    }else if(scouts.length < 0) {
        var newName = 'Scouts' + Game.time;
        console.log('Spawning new scout: ' + newName);
        Game.spawns['Spawn1'].spawnCustomCreep(energy, newName,'scout');
    }
    
    
    
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
/*    var tower = Game.getObjectById('267b86d1713fba9af159bbf3');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
*/
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'scout') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'longdistanceharvester') {
            roleLongDistanceHarvester.run(creep);
        }
    
    
    }
}