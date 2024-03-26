function splitString(str) {
    try{
        if (typeof str !== 'string') {
            console.error('Input is not a string');
            return [];
        }
        const parts = str.split(' ');
        if (parts.length < 2) {
            console.log("The string does not contain a space character.");
            return null; 
        }
    
        const firstPart = parts.slice(0, 1).join(' ');
        const secondPart = parts.slice(1).join(' '); 
    
        return {
            firstPart: firstPart,
            secondPart: secondPart
        };
    }
    catch(ex){
        console.log(ex);
        return null;
    }
}

function generateRandomUsername(inputString) {
    const baseUsername = inputString.trim().toLowerCase();
    const randomSuffix = Math.random().toString(36).substring(2, 8); 
    const randomUsername = baseUsername + '_' + randomSuffix;
    return randomUsername;
}