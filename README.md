# 🧮 Lincoln University of Missouri Cost Calculator

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

- `prototype.html` - Scraped page used as a containerized template to render the graduate cost calculator in a layout matching Lincoln University
- `assets/cost-calculator.js` - Calculator logic (tuition, program fees, books) with query string parameter features
- `assets/cost-calculator.css` - Custom styling for the calculator
- `assets/prototype-isolated.html` - Standalone mockup with the client-approved design
- `Academics _ Lincoln University of Missouri_files/` - Downloaded Lincoln University assets (fonts, CSS, etc.)
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

Adjustable values are stored in the `data-` attributes of the `#costCalculator` form element in both `prototype.html` and `assets/prototype-isolated.html`. These values include:

- `data-online-cost` - Online tuition rate per credit hour
- `data-in-state-cost` - In-state tuition rate per credit hour
- `data-out-of-state-cost` - Out-of-state tuition rate per credit hour
- `data-edu-fee` - Education program fee per credit hour
- `data-bus-fee` - Business program fee per credit hour
- `data-nur-fee` - Nursing program fee per credit hour
- `data-other-programs-fee` - Other programs fee per credit hour
- `data-books-cost` - Book cost per course

Example:
```html
<form id="costCalculator"
    data-online-cost="372"
    data-in-state-cost="372"
    data-out-of-state-cost="690"
    data-edu-fee="15"
    data-bus-fee="20"
    data-nur-fee="125"
    data-other-programs-fee="0"
    data-books-cost="90">
```

## Usage

1. Open `prototype.html` or `assets/prototype-isolated.html` in a web browser
2. Select your academic term
3. Select your enrollment type (Online or In-seat)
4. Choose residency status (if applicable)
5. Select your graduate program
6. Adjust credit hours using the slider
7. Click "Calculate Total Cost" to see your estimate

## Development Notes

- The calculator uses vanilla JavaScript with no external dependencies
- Form validation ensures all required fields are completed before calculation
- Book costs are estimated at $90 per course (3 credit hours = 1 course)
- Query string parameters can be used to pre-populate form values
- All cost figures are estimates and may vary based on actual enrollment

## Disclaimer

These figures are estimates only and may change based on course-specific or lab fees. Financial aid is not reflected in this calculator. Students should connect with Financial Services for personalized guidance.
