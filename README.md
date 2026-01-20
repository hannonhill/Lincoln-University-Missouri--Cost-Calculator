# Lincoln University Cost Calculator

A web-based net price calculator for graduate programs at Lincoln University of Missouri. This tool helps prospective students estimate tuition, program fees, and book costs based on their enrollment details.

## Overview

The calculator allows users to:
- Select between online (LUO) and in-seat (on-campus) enrollment
- Choose their residency status (for in-seat students)
- Pick from various graduate programs in Education, Business, Nursing, and other fields
- Adjust credit hours (1-12) using an interactive slider
- View cost estimates per semester or annually

## Features

- **Dynamic cost calculation** based on enrollment type, residency, program, and credit hours
- **Interactive UI** with real-time updates and form validation
- **Flexible configuration** via `window.netPriceConfig` for easy rate adjustments
- **Responsive design** matching Lincoln University's visual style
- **Semester/year toggle** to view costs in different time periods

## Project Structure

- `net-price-calculator.html` - Standalone calculator page with Lincoln University styles
- `net-price-calculator.js` - Core calculator logic and form handling
- `net-price-calculator.css` - Custom styling for the calculator
- `Academics _ Lincoln University of Missouri.html` - Full page embedding the calculator
- `Academics _ Lincoln University of Missouri_files/` - Downloaded Lincoln University assets (fonts, CSS, etc.)
- `prototype/` - Early design mockups and experimental features
- `Functional Requirements.png` - Visual specification of calculator requirements
- `README-dev.md` - Developer-focused implementation notes

## Tuition Rates

- **Online (LUO)**: $372/credit hour
- **In-seat Missouri resident**: $372/credit hour
- **In-seat Non-Missouri resident**: $690/credit hour

## Program Fees (per credit hour)

- **Education programs** (ECD, HED, MED.K12, MEd.COU): $15/hr
- **Business programs** (MBA, MBA.MGT): $20/hr
- **Nursing programs** (MSN): $125/hr
- **Other programs** (AGR, NS, HIS, SOC/SCJ): No fee

## Configuration

Rates and slider settings can be adjusted via the `window.netPriceConfig` object in each HTML file:

```javascript
window.netPriceConfig = {
  slider: { min: 1, max: 12, default: 6, ticks: [1, 3, 6, 9, 12] },
  bookCostPerCourse: 90,
  tuitionRates: { 
    online: 372, 
    inseat: { instate: 372, outstate: 690 } 
  },
  programFeeRates: { edu: 15, bus: 20, nur: 125, other: 0 }
};
```

## Usage

1. Open `net-price-calculator.html` in a web browser
2. Select your enrollment type (Online or In-seat)
3. Choose residency status (if applicable)
4. Select your graduate program
5. Adjust credit hours using the slider
6. Click "Calculate my costs" to see your estimate
7. Toggle between "Per semester" and "Per year" views as needed

## Development Notes

- The calculator uses vanilla JavaScript with no external dependencies
- Form validation ensures all required fields are completed before calculation
- Book costs are estimated at $90 per course (3 credit hours = 1 course)
- All cost figures are estimates and may vary based on actual enrollment

## Disclaimer

These figures are estimates only and may change based on course-specific or lab fees. Financial aid is not reflected in this calculator. Students should connect with Financial Services for personalized guidance.
