module.exports = function(){
    StructureSpawn.prototype.spawnCustomCreep= function(energy, creepName, roleName){
        let numberOfParts = Math.floor(energy / 200);
        var body = [];
    if(roleName == 'defender'){
        for (let i = 0; i< numberOfParts; i++){
                    body.push(TOUGH,TOUGH);
                    
        }
        for (let i = 0; i< numberOfParts; i++){
                    body.push(ATTACK);
                    
        }
    }else{
        for (let i = 0; i< numberOfParts; i++){
                    body.push(WORK);
                    
        }
    }
        for (let i = 0; i< numberOfParts; i++){
                body.push(CARRY);
        }
        for (let i = 0; i< numberOfParts; i++){
                body.push(MOVE);
        }
        return this.createCreep(body, creepName , {role: roleName});
    };

     StructureSpawn.prototype.spawnLongDistanceHarvester= 
     function(energy,creepName, numberOfWorkParts,home,target,sourceIndex){
         const body = [];
        for (let i = 0; i< numberOfWorkParts; i++){
                    body.push(WORK);
                    
        }
        energy -= 150* numberOfWorkParts
       let numberOfParts = Math.floor(energy/ 100);
        for (let i = 0; i<numberOfParts; i++){
                body.push(CARRY);
        }
        for (let i = 0; i<numberOfParts + numberOfWorkParts ; i++){
                body.push(MOVE);
        }
        
         return this.createCreep(body, creepName , {
             role: 'longdistanceharvester', 
             home: home,
             target: target,
             sourceIndex: sourceIndex
         });
     };

};