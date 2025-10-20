export function clip(x: number, epsilon: number = 1e-7){
    if(x < epsilon){
        return epsilon;
    }
    else if(x > (1 - epsilon)){
        return 1 - epsilon
    }
    else{
        return x
    }
}