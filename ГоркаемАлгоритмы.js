//Реализаци алгоритма бинарного поиска

const binarySearch = (list, item) => {
    console.log("Binary search test: ");

    let low = 0;
    let height = list.length - 1;
    let time = new Date().getTime();

    while (low <= height) {
        let mid = Math.floor((low + height) / 2);
        if (list[mid] === item) {
            console.log(new Date().getTime() - time);
            return mid;
        }

        if (list[mid] > item) {
            height = --mid;
        } else {
            low = ++mid;
        }
    }
    return null;
};

const badSearch = (array, item) => {
    let time = new Date().getTime();
    console.log("Bad search testing: ");
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            console.log(new Date().getTime() - time);
            return item
        }
    }
    return null;
};

const searchWithStreamApi = (array, item) => {
    console.log("Stream search test: ");
    let time = new Date().getTime();

    let element = array.find(element => element === item);

    console.log(new Date().getTime() - time)
};

let test = [];
for (let i = 0; i < 25600000; i++) {
    test.push(i)
}

binarySearch(test, 23300000);
console.log("=========================================");
searchWithStreamApi(test, 23300000);
console.log("=========================================");
badSearch(test, 23300000);

/*
* Binary search test:
* 0
* =========================================
* Stream search test:
* 432
* =========================================
* bad search testing: 
* 67
*
*/

//Сортировка выбором

const findMin = array => {
    let min = array[0];

    array.forEach((element) => {
        if (element < min) {
            min = element;
        }
    });

    return array.indexOf(min);
};

const selectionSort = array => {
    let result = [];

    for (let i = array.length; i > 0; i--) {
        let indexOfMin = findMin(array);
        result.push(array[indexOfMin]);
        array.splice(indexOfMin, 1)
    }

    return result;
};

let testTwo = [2, 32, 0, -34, 345, 345, 46, 3456, -32523, 464657, 45678, 64578, 543, 5435, 4];

selectionSort(testTwo);

/*
*Рекурсивная сумма
*/
recSum = (array) => {
    return array.length && array.pop() + recSum(array)
};

/*
* Quick sort
*/

let quickSort = (array) => {
    if (array.length < 2) {
        return array;
    } else {
        let temp = array[0];
        let less = [];
        let greater = [];

        for (let element of array) {
            if (element < temp) {
                less.push(element);
            } else if (element > temp) {
                greater.push(element);
            }
        }
        return [...quickSort(less), temp, ...quickSort(greater)]
    }
};

/**
 *  Graph
*/




let search = name => {
    
    let graph = {};
    graph.ivan = ["alice", "bob", "claire"];
    graph.bob = ["ivan", "marie", "nick"];
    graph.nick = ["jerry", "ivan", "mark"];
    graph.mark = ["jerry", "nicki", "lena", "diana","lucy"];
    graph.lena = ["lucy", "natsu", "gray", "gildarts","juvia"];
    graph.juvia = ["gray", "miledi", "lulu", "nicky","gildarts"];
    graph.gildarts = ["kana", "makarov", "morris", "kinana","siri"];
    
    let isElementFind = persone => persone === name;
    let getFristElement = graph => {
        return Object.keys(graph)[0];
    };
    
    let quite = [...graph[getFristElement(graph)]];
    let searched = [];
    
    console.log(quite);
    while (quite.length) {
        let user = quite.pop();
        if (searched.indexOf(user) === -1) {
            if (isElementFind(user)) {
                console.log(quite);
                return user;
            } else {
                console.log(quite);
                quite = quite.concat(graph[user]);
                searched.push(user);
            }
        }
    }
    return false;
};

search('siri');
/**
 *  Algoritm of Deikstra 
*/

let graph = {};
graph.start = {};
graph.start.a = 5;
graph.start.b = 2;
graph.a = {};
graph.a.c = 4;
graph.a.d = 2;
graph.c = {};
graph.c.d = 6;
graph.c.fin = 3;
graph.d = {};
graph.d.fin = 1;
graph.b = {};
graph.b.a = 8;
graph.b.d = 7;
graph.fin = {};

costs = {};
costs.a = 5;
costs.b = 2;
costs.c = 9;
costs.d = 7;
costs.fin = Infinity;

parents = {};
parents.d = 'b';
parents.c = 'a';
parents.a = 'start';
parents.b = 'start';
parents.in = null;

processed = [];

let findLowestCostNode = costs => {
    let lowestCost = Infinity;
    let lowestCostNode = null;

    for(let node in costs){
        let cost = costs[node];
        if(cost < lowestCost && processed.indexOf(node) === -1){
            lowestCost = cost;
            lowestCostNode = node;
        }
    }
    return lowestCostNode;
};

let node = findLowestCostNode(costs);

while(node){
    let cost = costs[node];
    let neighbors = graph[node];
    for(let n in Object.keys(neighbors)){
        let newCost = cost + neighbors[n];
        if(costs[n] > newCost){
            costs[n] = newCost;
            parents[n] = node;
        }
        processed.push(node);
        node = findLowestCostNode(costs);
    } 
}


console.log(processed);
console.log(parents);
console.log(costs);
console.log(graph);

/**
 * Жадные алгоритмы
*/

let neededStates = new Set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az']);

let stations = {};
stations.kone = new Set(['id', 'nv', 'ut']);
stations.ktwo = new Set(['wa', 'id', 'mt']);
stations.kthree = new Set(['or', 'nv', 'ca']);
stations.kfour = new Set(['nv', 'ut']);
stations.kfive = new Set(['ca', 'az']);

let finalStation = new Set();

while(neededStates.size){
    let bestStation;
    let statesCovered = new Set();

    let getCovered = (setOne, setTwo) => {
        let covered = new Set();
        setOne.forEach(element => {
            if(setTwo.has(element)) covered.add(element);
        });
    
        return covered;
    };

    let removeCovered = coveredStates => {
        coveredStates.forEach(element => {
            if(neededStates.has(element)) neededStates.delete(element)
        })
    };

    for(let station in stations) {
        let covered = getCovered(neededStates, stations[station]);
        if(covered.size > statesCovered.size){
            bestStation = station;
            statesCovered = covered;
        }
    }
    removeCovered(statesCovered);
    finalStation.add(bestStation);
}

console.log(finalStation);