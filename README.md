# COMP2003 Group 12 – Supply & Demand Forecasting System for FMCG Producer

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xGnTrW1S)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20873235)

## Trello board
https://trello.com/b/i39xaEPb/comp-project

## YouTube video showcase
https://youtu.be/trvFwt68jC8

## Link to our website:
https://d3bxteqfwcma5c.cloudfront.net/
### To sign in:
| Username | Password |
|---|---|
| admin | admin |

## Project Overview

This repository is for the COMP2003 Computing Group Project developed by Group 12 in collaboration with the external client **Genese Solutions**.

The project is a **Supply & Demand Forecasting System for an FMCG Producer**. The system is designed to help users forecast demand, analyse trends, simulate what-if scenarios, and identify potential stock issues before they occur.

The final system combines:

- A machine learning forecasting model
- A web-based frontend interface
- Forecast visualisation
- What-if scenario functionality
- Stock alert functionality
- Login/access control
- A simplified AWS cloud deployment approach
- Terraform-based Infrastructure as Code documentation

The project began with a local MVP during Interim 1 and was later developed into a more complete system with cloud-hosted frontend components and cloud architecture planning.

---

## Client

**Client:** Genese Solutions  
**Project:** Supply & Demand Forecasting System for FMCG Producer  
**Client Representatives:** Shubas Paudyal and Sandesh  

Genese Solutions provided feedback through weekly meetings and helped guide the scope, requirements, and direction of the project.

---

## Team Members and Roles

| Team Member | Main Role |
|---|---|
| Edward Davey | Project Lead, Data & Cloud |
| Sunchoeh Prince | Machine Learning & Forecasting |
| Ethan Jackson | Frontend UI & API Integration |
| Spencer Mason-Morgan | Cyber Security, Testing & Minutes |

---

## Core Features

The system includes the following main features:

- **Demand forecast generation** using a Python-based machine learning model
- **Frontend dashboard** for viewing forecast results
- **What-if scenario toggles** to allow users to simulate different demand conditions
- **Stock alerts** to notify users when forecasted demand may create stock issues
- **Login page** to restrict system access
- **API-based connection** between the frontend and forecasting component
- **Cloud-hosted frontend** using AWS S3 and CloudFront
- **Terraform Infrastructure as Code** files for cloud architecture planning and repeatable deployment

---

## Technology Stack

### Frontend
- HTML
- CSS
- JavaScript / React.js
- AWS S3
- AWS CloudFront

### Machine Learning
- Python
- Kaggle / notebook-based model development
- Forecasting model integration through API-based communication

### Cloud and Infrastructure
- AWS S3
- AWS CloudFront
- AWS Lambda
- AWS EC2
- AWS RDS
- AWS IAM
- AWS CloudWatch
- Terraform

### Project Management and Documentation
- GitHub
- Trello
- Meeting minutes
- UAT documentation
- Final report
- Showcase video

---

## System Architecture

The project originally considered a larger long-term AWS architecture including services such as Kinesis, SageMaker, automated retraining, and advanced monitoring.

However, after reviewing project constraints, cost, time, and client feedback, the architecture was simplified for the final implementation. The final system focuses on the services required to support the implemented product while leaving a path for future extension.

### Final Simplified Data Flow

```text
User
 ↓
Frontend hosted on AWS S3 / CloudFront
 ↓
API request
 ↓
Machine learning forecasting component
 ↓
Forecast output returned to frontend
 ↓
User views forecasts, what-if results, and stock alerts
