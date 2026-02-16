// TODO
// 

let lastCalculation = null;

function selectRadio(element) {
    const radioGroup = element.parentElement;
    radioGroup.querySelectorAll(".radio-option").forEach((option) => {
        option.classList.remove("selected");
    });
    element.classList.add("selected");
    element.querySelector('input[type="radio"]').checked = true;

    if (element.querySelector("input").name === "enrollmentType") {
        const value = element.querySelector("input").value;
        const residencyGroup = document.getElementById("residencyGroup");

        if (value === "inseat") {
            residencyGroup.classList.remove("hidden");
        } else {
            residencyGroup.classList.add("hidden");
            document
                .querySelectorAll('input[name="residency"]')
                .forEach((radio) => {
                    radio.checked = false;
                    radio.parentElement.classList.remove("selected");
                });
        }
    }

    updateURLFromOptions()
}

function togglePeriod(period) {
    document.querySelectorAll(".period-btn").forEach((btn) => {
        btn.classList.remove("active");
    });
    event.target.classList.add("active");

    if (lastCalculation) {
        updateDisplay();
    }
}

function updateDisplay() {
    if (!lastCalculation) return;

    const multiplier = 1;

    document.getElementById("tuitionRate").textContent =
        lastCalculation.tuitionRateDisplay;
    document.getElementById("tuitionCost").textContent =
        "$" + (lastCalculation.tuitionCost * multiplier).toLocaleString();
    document.getElementById("locationFees").textContent =
        "$" + (lastCalculation.locationFee * multiplier).toLocaleString();
    document.getElementById("programFees").textContent =
        "$" + (lastCalculation.programFees * multiplier).toLocaleString();
    document.getElementById("numCourses").textContent =
        lastCalculation.numCourses * multiplier;
    document.getElementById("booksCost").textContent =
        "$" + (lastCalculation.booksCost * multiplier).toLocaleString();
    document.getElementById("totalCost").textContent =
        "$" + (lastCalculation.totalCost * multiplier).toLocaleString();

    const resultsSection = document.querySelector('.results-section');
    resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}

function createErrorSpan(text, node) {
    node.classList.add('errorSection');
    let span = document.createElement('span');
    span.innerText = text;
    span.setAttribute('id', 'errorAnchor');
    span.style.scrollMarginTop = '.5rem';
    node.insertAdjacentElement('afterbegin', span);
    span.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function removeErrorSpan(node) {
    node.classList.remove('errorSection');
    node.querySelector(':scope > span').remove();
}

function calculateCost() {
    const enrollmentType = document.querySelector(
        'input[name="enrollmentType"]:checked'
    );
    const residency = document.querySelector('input[name="residency"]:checked');
    const program = document.getElementById("program").value;
    const creditHours =
        parseInt(document.getElementById("creditHours").value) || 0;
    
    const semesterSection = document.getElementById('semesterGroup');
    const enrollmentSection = document.getElementById('enrollment-section');
    const residencySection = document.getElementById('residencyGroup');
    const programSection = document.getElementById('programGroup');
    const creditGroup = document.getElementById('creditGroup');
    const semesterSelect = document.getElementById('semester').value;

    if (!semesterSelect) {
        !semesterSection.classList.contains('errorSection')
            ? createErrorSpan('Please select a term', semesterSection)
            : null;
        return;
    } else if (semesterSection.classList.contains('errorSection')) {
        removeErrorSpan(semesterSection);
    }

    if (!enrollmentType) {
        !enrollmentSection.classList.contains('errorSection')
            ? createErrorSpan('Please select an enrollment type (Online or In-Seat)', enrollmentSection)
            : null;
        return;
    } else if (enrollmentSection.classList.contains('errorSection')) {
        removeErrorSpan(enrollmentSection)
    }

    if (enrollmentType.value === "inseat" && !residency) {
        !residencySection.classList.contains('errorSection')
            ? createErrorSpan('Please select your residency status', residencySection)
            : null;
        return;
    } else if (residencySection.classList.contains('errorSection')) {
        removeErrorSpan(residencySection);
    }

    if (!program) {
        !programSection.classList.contains('errorSection')
            ? createErrorSpan('Please select a degree program', programSection)
            : null;
        return;
    } else if (programSection.classList.contains('errorSection')) {
        removeErrorSpan(programSection);
    }

    if (!creditHours || creditHours < 1 || creditHours > 12) {
        let max;
        semesterSelect.value.includes('summer')
            ? max = 12
            : max = 9;
        !creditGroup.classList.contains('errorSection')
            ? createErrorSpan(`Please select credit hours between 1 and ${max}`, creditGroup)
            : null;
        return;
    } else if (creditGroup.classList.contains('errorSection')) {
        removeErrorSpan(creditGroup);
    }


    const calcForm = document.getElementById('costCalculator');
    let onlineCost = parseInt(calcForm.dataset.onlineCost);
    let inStateCost = parseInt(calcForm.dataset.inStateCost);
    let outOfStateCost = parseInt(calcForm.dataset.outOfStateCost);
    let eduFee = parseInt(calcForm.dataset.eduFee);
    let busFee = parseInt(calcForm.dataset.busFee);
    let nurFee = parseInt(calcForm.dataset.nurFee);
    let otherProgramsFee = parseInt(calcForm.dataset.otherProgramsFee);
    let artSciFee = parseInt(calcForm.dataset.artSciFee);
    let aehsFee = parseInt(calcForm.dataset.aehsFee);
    let booksCost = parseInt(calcForm.dataset.booksCost);

    let locationFee = 0;
    let tuitionRate = 0;
    let tuitionRateDisplay = "";

    if (enrollmentType.value === "online") {
        tuitionRate = onlineCost;
        tuitionRateDisplay = `$${onlineCost}`;

        let onlineBoundaryHours = parseInt(calcForm.dataset.onlineBoundaryHours);
        let onlineUpperBoundFee = parseInt(calcForm.dataset.onlineUpperBoundaryFee);
        let onlineLowerBoundFee = parseInt(calcForm.dataset.onlineLowerBoundaryFee);
        creditHours >= onlineBoundaryHours ?
            locationFee = onlineUpperBoundFee / creditHours
            : locationFee = onlineLowerBoundFee;
    } else if (enrollmentType.value === "inseat") {
        if (residency.value === "instate") {
            tuitionRate = inStateCost;
            tuitionRateDisplay = `$${inStateCost}`;

            let inStateFee = parseInt(calcForm.dataset.inStateFee);
            locationFee = inStateFee;
        } else {
            tuitionRate = outOfStateCost;
            tuitionRateDisplay = `$${outOfStateCost}`;

            let outOfStateFee = parseInt(calcForm.dataset.outOfStateFee);
            locationFee = outOfStateFee;

        }
    }

    let programFeeRate = 0;
    const programPrefix = program.split("-")[0];

    switch (programPrefix) {
        case "edu":
            programFeeRate = eduFee;
            break;
        case "bus":
            programFeeRate = busFee;
            break;
        case "nur":
            programFeeRate = nurFee;
            break;
        case "art&sci":
            programFeeRate = artSciFee;
            break;
        case "aehs":
            programFeeRate = aehsFee;
            break;
        default:
            programFeeRate = otherProgramsFee;
    }

    const tuitionCost = tuitionRate * creditHours;
    const programFees = programFeeRate * creditHours;
    const numCourses = Math.ceil(creditHours / 3);
    booksCost = numCourses * booksCost;
    locationFee = locationFee * creditHours;
    const totalCost = tuitionCost + locationFee + programFees + booksCost;

    lastCalculation = {
        tuitionRateDisplay: tuitionRateDisplay,
        tuitionCost: tuitionCost,
        programFees: programFees,
        numCourses: numCourses,
        booksCost: booksCost,
        locationFee: locationFee,
        totalCost: totalCost
    };

    updateDisplay();
}

function updateURLFromOptions() {
    const params = new URLSearchParams();

    const semester = document.getElementById('semester');
    if (semester.value) {
        const semesterName = semester.name;
        const semesterValue = semester.value;
        params.set(semesterName, semesterValue);
    }

    const enrollmentType = 
        document.querySelector('input[name="enrollmentType"]:checked');
    const residency = 
        document.querySelector('input[name="residency"]:checked');
    if (enrollmentType) {
        const enrollmentTypeName = enrollmentType.name;
        const enrollmentTypeValue = enrollmentType.value;
        params.set(enrollmentTypeName, enrollmentTypeValue);

        if (residency) {
            const residencyName = residency.name;
            const residencyValue = residency.value;
            params.set(residencyName, residencyValue);
        }
    }

    const program = document.getElementById('program');
    if (program.value) {
        const programName = program.name;
        const programValue = program.value;
        params.set(programName, programValue);
    }

    const creditSlider = document.getElementById('creditHours');
    if (creditSlider.value != '6') {
        const creditSliderName = creditSlider.name;
        const creditSliderValue = creditSlider.value;
        params.set(creditSliderName, creditSliderValue);
    }

    const newURL = 
        window.location.pathname + 
        (params.toString() ? `?${params.toString()}` : '');
    history.replaceState({}, '',  newURL);
}

function applyOptionsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const creditHours = document.getElementById('creditHours');
    const sliderMax = document.getElementById('sliderMax');
    params.forEach((value, name) => {
        if (name === 'semester') {
            const semester = 
                document.getElementById('semester');
            semester.value = value;
            if (value.includes('summer')) {
                creditHours.setAttribute('max', '9');
                sliderMax.innerText = '9';
            }
        }

        if (name === 'enrollmentType') {
            const enrollment = 
                document.querySelector(`input[name="enrollmentType"][value="${value}"]`);
            enrollment.checked = true;
        }
        if (name === 'enrollmentType' && value === 'inseat') {
            const residencyGroup = 
                document.getElementById('residencyGroup');
            residencyGroup.classList.remove('hidden');
        }

        if (name === 'residency') {
            const residency = 
                document.querySelector(`input[name="residency"][value="${value}"]`)
            residency
                ? residency.checked = true
                : null;
        }

        if (name === 'program') {
            const program = 
                document.getElementById('program');
            program.value = value;
        }

        if (name === 'creditHours') {
            const creditHoursValue = document.getElementById('creditHoursValue');
            const courseCount = document.getElementById('courseCount');
            creditHours.value = value;
            creditHoursValue.innerText = value;
            courseCount.innerText = Math.ceil(value / 3);
        }
    })
}

function resetOptions() {
    const semester = document.getElementById('semester');
    semester.value = '';

    const enrollmentType = 
        document.querySelector('input[name="enrollmentType"]:checked');
    enrollmentType
        ? enrollmentType.checked = false
        : null;

    const residencyGroup = document.getElementById('residencyGroup');
    const residency = 
        document.querySelector('input[name="residency"]:checked');
    residency
        ? residency.checked = false
        : null;
    !residencyGroup.classList.contains('hidden')
        ? residencyGroup.classList.add('hidden')
        : null;

    const program = document.getElementById('program');
    program.value = '';

    const creditHours = document.getElementById('creditHours');
    const creditHoursValue = document.getElementById('creditHoursValue');
    const courseCount = document.getElementById('courseCount');
    const countPlural = document.getElementById('count_plural');
    creditHours.value = '6';
    creditHours.setAttribute('max', '12');
    creditHoursValue.innerText = '6';
    courseCount.innerText = '2';
    countPlural.removeAttribute('hidden');

    updateURLFromOptions();

    const tuitionRate = document.getElementById('tuitionRate');
    tuitionRate.innerText = '$0';
    const tuitionCost = document.getElementById('tuitionCost');
    tuitionCost.innerText = '$0';
    const locationFees = document.getElementById('locationFees');
    locationFees.innerText = '$0';
    const programFees = document.getElementById('programFees');
    programFees.innerText = '$0';
    const numCourses = document.getElementById('numCourses');
    numCourses.innerText = '0';
    const booksCost = document.getElementById('booksCost');
    booksCost.innerText = '$0'
    const totalCost = document.getElementById('totalCost');
    totalCost.innerText = '$0';

    const errorSections = document.querySelectorAll('.errorSection');
    errorSections.forEach(section => {
        section.classList.remove('errorSection');
        const span = section.querySelector(':scope > span');
        span.remove();
    })

    const selectedRadios = document.querySelectorAll('.selected');
    selectedRadios.forEach(radio => {
        radio.classList.remove('selected');
    })

    const costCalculator = document.getElementById('costCalculator');
    costCalculator.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("tuitionRate").textContent = "$0";
    document.getElementById("numCourses").textContent = "0";
    
    const creditSlider = document.getElementById("creditHours");
    const creditValue = document.getElementById("creditHoursValue");
    const courseCount = document.getElementById("courseCount");
    const countPlural = document.getElementById('count_plural');
    
    creditSlider.addEventListener("input", function () {
        const hours = this.value;
        creditValue.textContent = hours;
        const courses = Math.ceil(hours / 3);
        courseCount.textContent = courses;
        courses <= 1
            ? countPlural.setAttribute('hidden', '')
            : countPlural.removeAttribute('hidden');
        const percentage = ((hours - 1) / 11) * 100;
        this.style.background =
        "linear-gradient(to right, #C6B66D 0%, #C6B66D " +
        percentage +
        "%, #e0e0e0 " +
        percentage +
        "%, #e0e0e0 100%)";
        updateURLFromOptions();
    });
    
    // creditSlider.dispatchEvent(new Event("input"));
    
    const semesterSelect = document.getElementById('semester');
    let sliderMax = document.getElementById('sliderMax');
    semesterSelect.addEventListener('change', function() {
        const isSummer = this.value.includes('summer');
        switch(isSummer) {
            case true: 
                creditSlider.setAttribute('max', '9');
                sliderMax.textContent = '9';
                creditValue.textContent = creditSlider.value;
                break;
            default:
                creditSlider.setAttribute('max', '12');
                sliderMax.textContent = '12';
                creditValue.textContent = creditSlider.value;
        }
        updateURLFromOptions();
    });

    const programSelect = document.getElementById('program');
    programSelect.addEventListener('change', () => {
        updateURLFromOptions();
    })

    if(window.location.search) {
        applyOptionsFromURL()
    }
});
