class UtilityService{
    roundToPlaces(num, places) { 
        let multiplier = Math.pow(10, places); 
        return (Math.round(num * multiplier) / multiplier);
    }
}

export default new UtilityService();