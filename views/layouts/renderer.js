class Elevator {
    constructor(currentFloor, targetFloor1, targetFloor2, targetFloor3, passengersNumber) {
        this.direction = null;
        this.prioritizedFloors = null;
        this.targetFloors = null;
        this.targetFloor = null;
        this.passengersNumber = passengersNumber;
        this.currentFloor = currentFloor;
        this.prioritizeTargetFloors([targetFloor1, targetFloor2, targetFloor3])
    }

    runElevator() {
        this.direction = (this.targetFloor - this.currentFloor) / (Math.abs((this.targetFloor - this.currentFloor)))
        this.currentFloor = this.currentFloor + this.direction;
    }

    prioritizeTargetFloors(targetFloors) {

        this.targetFloors = targetFloors;

        // remove disabled targets
        let ways = [];
        let passedFloor = this.targetFloors.indexOf(null);
        while (passedFloor !== -1) {
            this.targetFloors.splice(this.targetFloors.indexOf(null), 1);
            passedFloor = this.targetFloors.indexOf(null)
        }

        this.targetFloors.forEach(floor => ways.push(floor - this.currentFloor));

        ways = ways.sort(function (a, b) { return Math.abs(a) - Math.abs(b) }).map(num => num + this.currentFloor);

        this.targetFloor = ways[0];
        this.prioritizedFloors = ways;
        this.targetFloors = ways;
    }

    nextPassenger() {
        this.passengersNumber--;
        this.prioritizedFloors.shift();
    }
}

function startAll() {
    let elevators = new Array(16)
    for (let n = 0; n < elevators.length; n++) {
        elevators[n] = new Elevator(0, 0, 0, 0, 0)
    }
    return elevators
}


const elevators = startAll();

function runSystem() {
    const currentFloors = $(".floor-current");
    const targetFloors = [$(".floor-target1"), $(".floor-target2"), $(".floor-target3")];
    const passengersNumber = $(".passengers-number");
    i = 0;
    for (let n = 0; n < elevators.length; n++) {
        currentFloors.eq(i).val(elevators[n].currentFloor);
        passengersNumber.eq(i).val(elevators[n].passengersNumber);

        passengersNumber[n].addEventListener('change', (event) => {
            elevators[n].passengersNumber = $(".passengers-number").eq(n).val();
            acceptPassengers(n);
        });

        targetFloors[0].eq(i).val(elevators[n].targetFloors[0]);
        targetFloors[1].eq(i).val(elevators[n].targetFloors[1]);
        targetFloors[2].eq(i).val(elevators[n].targetFloors[2]);
        i++;
    }
}

function acceptPassengers(elevatorNumber) {
    const targetFloors = [$(".floor-target1"), $(".floor-target2"), $(".floor-target3")];
    for (let n = 0; n < targetFloors.length; n++) {
        if (n < elevators[elevatorNumber].passengersNumber) {
            targetFloors[n].eq(elevatorNumber).prop("disabled", false);
        } else {
            targetFloors[n].eq(elevatorNumber).prop("disabled", true);
        }

        if ($(`.floor-target${n + 1}`).eq(elevatorNumber).is(":disabled")) {
            elevators[elevatorNumber].targetFloors[n] = null;
        } else {
            elevators[elevatorNumber].targetFloors[n] = Number($(`.floor-target${n + 1}`).eq(elevatorNumber).val());
        }
    }

}

function simulateStep() {
    for (let n = 0; n < elevators.length; n++) {
        acceptPassengers(n);

        if (elevators[n].passengersNumber > 0) {
            elevators[n].prioritizeTargetFloors(elevators[n].targetFloors);

            if (elevators[n].currentFloor !== elevators[n].targetFloor) {
                elevators[n].runElevator();
            };

            $(".floor-current").eq(n).val(elevators[n].currentFloor);

            if (elevators[n].currentFloor == elevators[n].targetFloor) {
                elevators[n].nextPassenger();

                $(".passengers-number").eq(n).val(elevators[n].passengersNumber);

                if (elevators[n].passengersNumber > 0) {
                    colorizeYellow(n);
                } else {
                    colorizeGreen(n);
                };

            } else {
                colorizeBlue(n);
            };
            for (let f = 0; f < elevators[n].targetFloors.length; f++) {
                $(`.floor-target${f + 1}`).eq(n).val(elevators[n].prioritizedFloors[f]);
            };
        } else {
            colorizeWhite(n);
        }
        acceptPassengers(n);
    }
}

function colorizeBlue(index) {
    $(".floor-current").eq(index).css({ "background-color": "rgba(0, 0, 255, 0.2)" })
}

function colorizeYellow(index) {
    $(".floor-current").eq(index).css({ "background-color": "rgba(255, 255, 0, 0.5)" })
}

function colorizeGreen(index) {
    $(".floor-current").eq(index).css({ "background-color": "rgba(0, 255, 0, 0.5)" })
}

function colorizeWhite(index) {
    $(".floor-current").eq(index).css({ "background-color": "rgba(0, 0, 0, 0)" })
}