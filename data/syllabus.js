var GATE_DA_SYLLABUS = window.GATE_DA_SYLLABUS;
window.GATE_DA_SYLLABUS = {
  "examPattern": {
    "paperCode": "DA",
    "paperName": "Data Science & Artificial Intelligence",
    "duration": "3 Hours (180 Minutes)",
    "totalQuestions": 65,
    "totalMarks": 100,
    "sections": [
      {
        "name": "General Aptitude (GA)",
        "questions": 10,
        "marks": 15,
        "questionTypes": "5 x 1-mark + 5 x 2-mark"
      },
      {
        "name": "Technical / Core Subjects",
        "questions": 55,
        "marks": 85,
        "questionTypes": "25 x 1-mark + 30 x 2-mark"
      }
    ],
    "questionFormats": [
      {
        "type": "MCQ",
        "name": "Multiple Choice Questions",
        "desc": "4 options, 1 correct. Negative marking: 1/3 for 1-mark, 2/3 for 2-mark."
      },
      {
        "type": "MSQ",
        "name": "Multiple Select Questions",
        "desc": "1 or more options correct. NO partial marking, NO negative marking."
      },
      {
        "type": "NAT",
        "name": "Numerical Answer Type",
        "desc": "Real number input via virtual keyboard. NO negative marking."
      }
    ]
  },
  "weightageAnalysis": [
    {
      "subject": "Probability & Statistics",
      "marksRange": "14 - 16 Marks",
      "weightagePct": 15,
      "difficulty": "Moderate to High",
      "yield": "Very High"
    },
    {
      "subject": "Linear Algebra & Vector Spaces",
      "marksRange": "12 - 14 Marks",
      "weightagePct": 13,
      "difficulty": "Moderate",
      "yield": "Very High"
    },
    {
      "subject": "Machine Learning (Supervised & Unsupervised)",
      "marksRange": "16 - 18 Marks",
      "weightagePct": 17,
      "difficulty": "Moderate to Tough",
      "yield": "Highest"
    },
    {
      "subject": "Database Systems & Data Warehousing",
      "marksRange": "14 - 16 Marks",
      "weightagePct": 15,
      "difficulty": "Easy to Moderate",
      "yield": "High (Scoring)"
    },
    {
      "subject": "Python Programming & DSA",
      "marksRange": "12 - 14 Marks",
      "weightagePct": 13,
      "difficulty": "Moderate",
      "yield": "High"
    },
    {
      "subject": "General Aptitude",
      "marksRange": "15 Marks",
      "weightagePct": 15,
      "difficulty": "Easy to Moderate",
      "yield": "Guaranteed 12+"
    },
    {
      "subject": "Calculus & Optimization",
      "marksRange": "6 - 8 Marks",
      "weightagePct": 7,
      "difficulty": "Moderate",
      "yield": "Medium"
    },
    {
      "subject": "Artificial Intelligence (Search & Logic)",
      "marksRange": "5 - 7 Marks",
      "weightagePct": 5,
      "difficulty": "Moderate",
      "yield": "Medium"
    }
  ],
  "sections": [
    {
      "id": "prob-stats",
      "name": "Probability and Statistics",
      "weightage": "~15 Marks",
      "badge": "Crucial Foundation",
      "topics": [
        {
          "id": "ps-1",
          "title": "Counting: Permutations and Combinations",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Counting, Permutations and Combinations"
        },
        {
          "id": "ps-2",
          "title": "Probability Axioms, Sample Space, Independent & Mutually Exclusive Events",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Probability Theory"
        },
        {
          "id": "ps-3",
          "title": "Marginal, Conditional, and Joint Probability",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Probability Theory"
        },
        {
          "id": "ps-4",
          "title": "Bayes Theorem and Law of Total Probability",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Probability Theory"
        },
        {
          "id": "ps-5",
          "title": "Conditional Expectation and Variance",
          "highYield": false,
          "subjectId": "probability",
          "chapterIdx": 4,
          "chapterName": "Chapter 5: Expectation & Variance"
        },
        {
          "id": "ps-6",
          "title": "Descriptive Stats: Mean, Median, Mode, Standard Deviation, Covariance & Correlation",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Introduction to Statistics"
        },
        {
          "id": "ps-7",
          "title": "Discrete Random Variables & PMF: Uniform, Bernoulli, Binomial",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 5,
          "chapterName": "Chapter 6: Discrete Distributions"
        },
        {
          "id": "ps-8",
          "title": "Continuous Random Variables & PDF: Uniform, Exponential, Poisson, Normal, Standard Normal",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 6,
          "chapterName": "Chapter 7: Continuous Distributions"
        },
        {
          "id": "ps-9",
          "title": "Sampling Distributions: t-distribution, Chi-squared distribution",
          "highYield": false,
          "subjectId": "probability",
          "chapterIdx": 7,
          "chapterName": "Chapter 8: Central Limit Theorem & Confidence Intervals"
        },
        {
          "id": "ps-10",
          "title": "Cumulative Distribution Function (CDF) and Conditional PDF",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Random Variables & Distributions"
        },
        {
          "id": "ps-11",
          "title": "Central Limit Theorem (CLT) & Law of Large Numbers",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 7,
          "chapterName": "Chapter 8: Central Limit Theorem & Confidence Intervals"
        },
        {
          "id": "ps-12",
          "title": "Statistical Inference: Confidence Intervals, z-test, t-test, Chi-squared test",
          "highYield": true,
          "subjectId": "probability",
          "chapterIdx": 7,
          "chapterName": "Chapter 8: Central Limit Theorem & Confidence Intervals"
        }
      ]
    },
    {
      "id": "linear-algebra",
      "name": "Linear Algebra & Vector Spaces",
      "weightage": "~13 Marks",
      "badge": "Core Mathematical Engine",
      "topics": [
        {
          "id": "la-1",
          "title": "Matrices, Types, Determinants, Inverses, Adjoint",
          "highYield": true,
          "subjectId": "matrices",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Matrices"
        },
        {
          "id": "la-2",
          "title": "Echelon Forms, Row Space, Column Space, Null Space",
          "highYield": true,
          "subjectId": "matrices",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Echelon Forms and Rank"
        },
        {
          "id": "la-3",
          "title": "Rank of a Matrix and Rank-Nullity Theorem",
          "highYield": true,
          "subjectId": "matrices",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Echelon Forms and Rank"
        },
        {
          "id": "la-4",
          "title": "System of Linear Equations (Gaussian elimination, consistency, Ax=b)",
          "highYield": true,
          "subjectId": "matrices",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Linear Equations"
        },
        {
          "id": "la-5",
          "title": "Eigenvalues and Eigenvectors, Characteristic Polynomial, Diagonalization",
          "highYield": true,
          "subjectId": "matrices",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Eigenvalues and Eigenvectors"
        },
        {
          "id": "la-6",
          "title": "Matrix Factorization & LU Decomposition",
          "highYield": false,
          "subjectId": "matrices",
          "chapterIdx": 4,
          "chapterName": "Chapter 5: Matrix Factorization"
        },
        {
          "id": "la-7",
          "title": "Special Matrices (Projection, Orthogonal, Normal, Idempotent)",
          "highYield": true,
          "subjectId": "matrices",
          "chapterIdx": 5,
          "chapterName": "Chapter 6: Special Matrices"
        },
        {
          "id": "la-8",
          "title": "Vector Spaces, Subspaces, Linear Dependence and Independence, Basis & Dimension",
          "highYield": true,
          "subjectId": "vector-advla",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Vector Concepts"
        },
        {
          "id": "la-9",
          "title": "Orthogonal Vectors, Gram-Schmidt Process & Projections",
          "highYield": true,
          "subjectId": "vector-advla",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Orthogonal Vectors & Projections"
        },
        {
          "id": "la-10",
          "title": "Quadratic Forms (Canonical, Definiteness & Indefiniteness)",
          "highYield": true,
          "subjectId": "vector-advla",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Quadratic Forms"
        },
        {
          "id": "la-11",
          "title": "Singular Value Decomposition (SVD) and Pseudoinverse",
          "highYield": true,
          "subjectId": "vector-advla",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Singular Value Decomposition (SVD)"
        }
      ]
    },
    {
      "id": "calculus-opt",
      "name": "Calculus and Optimization",
      "weightage": "~7 Marks",
      "badge": "Essential for ML Gradients",
      "topics": [
        {
          "id": "co-1",
          "title": "Functions of Single Variable: Domain, Range, Classes, Inverse & Composite",
          "highYield": false,
          "subjectId": "calculus-opt",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Functions"
        },
        {
          "id": "co-2",
          "title": "Limits, Left & Right Limits, Limits at Infinity, L'Hopital's Rule",
          "highYield": true,
          "subjectId": "calculus-opt",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Limits"
        },
        {
          "id": "co-3",
          "title": "Continuity and Intermediate Value Theorem",
          "highYield": true,
          "subjectId": "calculus-opt",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Continuity"
        },
        {
          "id": "co-4",
          "title": "Differentiability, Rolle's Theorem and Mean Value Theorem",
          "highYield": true,
          "subjectId": "calculus-opt",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Differentiability"
        },
        {
          "id": "co-5",
          "title": "Maxima, Minima, Critical Points, Point of Inflection & Concavity",
          "highYield": true,
          "subjectId": "calculus-opt",
          "chapterIdx": 4,
          "chapterName": "Chapter 5: Optimization (Maxima/Minima)"
        },
        {
          "id": "co-6",
          "title": "Taylor Series and Maclaurin Series Expansions",
          "highYield": true,
          "subjectId": "calculus-opt",
          "chapterIdx": 5,
          "chapterName": "Chapter 6: Taylor and Maclaurin Series"
        }
      ]
    },
    {
      "id": "python-dsa",
      "name": "Programming in Python, Data Structures & Algorithms",
      "weightage": "~13 Marks",
      "badge": "Practical Problem Solving",
      "topics": [
        {
          "id": "py-1",
          "title": "Python Syntax, Variables, Identifiers, Assignment & Operators",
          "highYield": false,
          "subjectId": "python",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Python Basics"
        },
        {
          "id": "py-2",
          "title": "Built-in Data Structures: Strings, Lists, Tuples, Dictionaries, Sets",
          "highYield": true,
          "subjectId": "python",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Built in Data Structures"
        },
        {
          "id": "py-3",
          "title": "Control Flow: If-Else Conditionals, For & While Loops",
          "highYield": true,
          "subjectId": "python",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Control Flow"
        },
        {
          "id": "py-4",
          "title": "Functions, Arguments, Scope & LEGB Rule in Python",
          "highYield": true,
          "subjectId": "python",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Functions"
        },
        {
          "id": "py-5",
          "title": "List/Dict Comprehensions, Iterators & Generators",
          "highYield": true,
          "subjectId": "python",
          "chapterIdx": 4,
          "chapterName": "Chapter 5: Comphrensions and Generators"
        },
        {
          "id": "py-6",
          "title": "Object-Oriented Programming (Classes, Objects, Inheritance, super(), MRO)",
          "highYield": true,
          "subjectId": "python",
          "chapterIdx": 5,
          "chapterName": "Chapter 6: Object Oriented Programming"
        }
      ]
    },
    {
      "id": "dbms-mining",
      "name": "Database Systems & Data Warehousing",
      "weightage": "~15 Marks",
      "badge": "High Scoring Section",
      "topics": [
        {
          "id": "db-1",
          "title": "DBMS Architecture, Data Independence, 3-Schema Architecture",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Introduction to DBMS"
        },
        {
          "id": "db-2",
          "title": "Entity-Relationship (ER) Model, Diagrams, Attributes, Relationship Sets",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: ER Model"
        },
        {
          "id": "db-3",
          "title": "Relational Model, Cardinality, Domain, Keys (Primary, Candidate, Foreign)",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Relational Model"
        },
        {
          "id": "db-4",
          "title": "Relational Algebra: Selection, Projection, Joins, Cartesian Product & Set Ops",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Relational Algebra and Tuple Calculus"
        },
        {
          "id": "db-5",
          "title": "SQL Queries: DDL, DML, Joins, GROUP BY, HAVING, Nested Subqueries",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 4,
          "chapterName": "Chapter 5: Structured Query Language (SQL)"
        },
        {
          "id": "db-6",
          "title": "Functional Dependencies, Armstrong's Axioms & Normalization (1NF, 2NF, 3NF, BCNF)",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 5,
          "chapterName": "Chapter 6: Normalization"
        },
        {
          "id": "db-7",
          "title": "Data Organization & Indexing: Primary, Clustering, Secondary, Dense/Sparse, B/B+ Trees",
          "highYield": true,
          "subjectId": "dbms",
          "chapterIdx": 6,
          "chapterName": "Chapter 7: Data Organization and Indexing"
        },
        {
          "id": "dw-8",
          "title": "Data Warehousing: Statistical Description of Data & Attribute Types",
          "highYield": true,
          "subjectId": "datamining",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: The Data"
        },
        {
          "id": "dw-9",
          "title": "Data Preprocessing: Missing Values, Outliers, Data Reduction, PCA & Discretization",
          "highYield": true,
          "subjectId": "datamining",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Data Preprocessing"
        },
        {
          "id": "dw-10",
          "title": "OLAP vs OLTP, Data Warehouse Architecture & Multi-dimensional Data Cubes",
          "highYield": true,
          "subjectId": "datamining",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Data Warehousing & OLAP"
        }
      ]
    },
    {
      "id": "machine-learning",
      "name": "Machine Learning (Supervised & Unsupervised)",
      "weightage": "~17 Marks",
      "badge": "Highest Deciding Factor",
      "topics": [
        {
          "id": "ml-1",
          "title": "Overview of Machine Learning: Types, Workflow, Data, Bias & Overfitting",
          "highYield": false,
          "subjectId": "ml-supervised",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Introduction to Machine Learning"
        },
        {
          "id": "ml-2",
          "title": "Simple & Multiple Linear Regression, OLS, RSS, R-squared, Standard Error",
          "highYield": true,
          "subjectId": "ml-supervised",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Regression Models"
        },
        {
          "id": "ml-3",
          "title": "Logistic Regression: Odds, Logit Function & Classification Decision Boundary",
          "highYield": true,
          "subjectId": "ml-supervised",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Classification Models I"
        },
        {
          "id": "ml-4",
          "title": "Naive Bayes Classifier & Maximum A Posteriori (MAP) Decision Rule",
          "highYield": true,
          "subjectId": "ml-supervised",
          "chapterIdx": 3,
          "chapterName": "Chapter 4: Classification Models II"
        },
        {
          "id": "ml-5",
          "title": "Model Evaluation, Cross-Validation (Hold-Out, K-Fold, LOOCV) & ROC-AUC Curves",
          "highYield": true,
          "subjectId": "ml-supervised",
          "chapterIdx": 4,
          "chapterName": "Chapter 5: Model Evaluation and Generalization"
        },
        {
          "id": "ml-6",
          "title": "Linear Discriminant Analysis (Fisher LDA) & Between/Within-class Variance",
          "highYield": false,
          "subjectId": "ml-supervised",
          "chapterIdx": 5,
          "chapterName": "Chapter 6: Regression and Classification Models"
        },
        {
          "id": "ml-7",
          "title": "Unsupervised Learning Overview & Taxonomy",
          "highYield": false,
          "subjectId": "ml-unsupervised",
          "chapterIdx": 0,
          "chapterName": "Chapter 1: Introduction to Unsupervised Learning"
        },
        {
          "id": "ml-8",
          "title": "Partition-Based Clustering: K-Means & K-Medoids Algorithms",
          "highYield": true,
          "subjectId": "ml-unsupervised",
          "chapterIdx": 1,
          "chapterName": "Chapter 2: Clustering Algorithms"
        },
        {
          "id": "ml-9",
          "title": "Dimensionality Reduction: Principal Component Analysis (PCA)",
          "highYield": true,
          "subjectId": "ml-unsupervised",
          "chapterIdx": 2,
          "chapterName": "Chapter 3: Dimensionality Reduction - Principal Component Analysis (PCA)"
        }
      ]
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Core Mathematical Foundation & Python (Weeks 1 - 6)",
      "targetCompletion": "Target: Oct 25, 2026",
      "focus": "Cover Linear Algebra (Strang / GateXAIML), Probability & Statistics (Walpole), Calculus, and Python fundamentals. Score target: 35-40 marks foundation."
    },
    {
      "phase": "Phase 2: Data Engines & Supervised Intelligence (Weeks 7 - 12)",
      "targetCompletion": "Target: Dec 06, 2026",
      "focus": "Master DBMS (Normal forms, B+ Trees, SQL), Data Warehousing, Supervised ML (Regression, Logistic, Naive Bayes, Evaluation metrics). Score target: 60+ marks capability."
    },
    {
      "phase": "Phase 3: Advanced ML & Past Year Question Drilling (Weeks 13 - 17)",
      "targetCompletion": "Target: Jan 10, 2027",
      "focus": "Finish Unsupervised Learning (K-Means, PCA), solve all GATE DA 2024 & 2025 PYQs + CS/IT relevant PYQs. Practice with Virtual Calculator exclusively."
    },
    {
      "phase": "Phase 4: Full-Length Mocks & High-Speed Revision (Weeks 18 - 21)",
      "targetCompletion": "Target: Exam Day (Feb 06, 2027)",
      "focus": "Take 15+ full-length 3-hour timed mocks in TCS iON simulation mode. Daily formula revision, error notebook post-mortem, and accuracy maximization."
    }
  ]
};
if (typeof module !== "undefined") { module.exports = window.GATE_DA_SYLLABUS; }
