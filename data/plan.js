/**
 * GATE DA 2027 145-Day High-Velocity Study Plan (Sept 14, 2026 -> Feb 6, 2027)
 * Tailored specifically for cracking GATE Data Science & AI in ~5 months.
 */

window.GATE_DA_PLAN = {
  startDate: "2026-09-14",
  examDate: "2027-02-06",
  totalDays: 145,
  targetScore: "70+ Marks (Top 50 AIR)",
  
  dailyTimeSlots: [
    { time: "Slot 1 (2.0 hrs)", task: "Watch 2-3 Core Video Lectures + Take active notes in Study Room" },
    { time: "Slot 2 (1.5 hrs)", task: "Read Official Subject Handbook PDF & write personal formula derivations" },
    { time: "Slot 3 (1.5 hrs)", task: "Practice 15-20 questions in Arena using only GATE Virtual Calculator" },
    { time: "Daily Wind-down (30 mins)", task: "General Aptitude drill + Review Formula Cheatsheet" }
  ],

  phases: [
    {
      phaseId: 1,
      name: "Phase 1: Mathematical Foundations & Python (Weeks 1 - 6 | Sept 14 - Oct 25)",
      goal: "Master Linear Algebra, Probability, Calculus, and Python Data Structures (~38 marks)",
      weeks: [
        {
          weekNum: 1,
          dates: "Sept 14 - Sept 20, 2026",
          subject: "Matrices and Linear Algebra",
          focus: "Matrices, Types, Determinants, Echelon Forms, Row/Column/Null Space, Rank-Nullity Theorem",
          lecturesTarget: "Lectures L1 to L11 (Matrices & Echelon Forms)",
          dailyGoals: [
            { day: 1, date: "2026-09-14", target: "L1 & L2: Matrices, Types, Properties & Determinants. Solve 10 determinant problems.", subjectId: "matrices" },
            { day: 2, date: "2026-09-15", target: "L3, L4, L5: Trace, Inverse Properties & Adjoint. Handbook Ch. 1 reading.", subjectId: "matrices" },
            { day: 3, date: "2026-09-16", target: "L6 & L7: Echelon Forms, Row/Col Space & Rank-Nullity Theorem. Drill rank calculations.", subjectId: "matrices" },
            { day: 4, date: "2026-09-17", target: "L8 & L9: Rank & Nullity Practice Problems. Quadratic forms intro.", subjectId: "matrices" },
            { day: 5, date: "2026-09-18", target: "L10 & L11: System of Linear Equations (Ax = b, consistency, unique/infinite/no solution).", subjectId: "matrices" },
            { day: 6, date: "2026-09-19", target: "Linear Algebra Handbook Ch. 1-2 review. Practice 25 questions in Arena.", subjectId: "matrices" },
            { day: 7, date: "2026-09-20", target: "Weekly Revision & Mock Test: Linear Algebra Basics + 30 mins General Aptitude.", subjectId: "matrices" }
          ]
        },
        {
          weekNum: 2,
          dates: "Sept 21 - Sept 27, 2026",
          subject: "Linear Algebra & Vector Spaces",
          focus: "Eigenvalues, Eigenvectors, Cayley-Hamilton, Orthogonal Vectors, SVD",
          lecturesTarget: "Lectures L12 to L21 + Vector Spaces L1 to L6",
          dailyGoals: [
            { day: 8, date: "2026-09-21", target: "L12 & L13: Eigenvalues and Eigenvectors: Characteristic equation & algebraic multiplicity.", subjectId: "matrices" },
            { day: 9, date: "2026-09-22", target: "L14 & L15: Geometric Multiplicity, Diagonalization & Cayley-Hamilton Theorem.", subjectId: "matrices" },
            { day: 10, date: "2026-09-23", target: "L16 & L17: Symmetric, Skew-Symmetric & Orthogonal Matrices. Spectral Theorem.", subjectId: "matrices" },
            { day: 11, date: "2026-09-24", target: "L18 to L21: Singular Value Decomposition (SVD) and Pseudoinverse.", subjectId: "matrices" },
            { day: 12, date: "2026-09-25", target: "Vector Spaces L1, L2, L3: Subspaces, Linear Independence, Basis & Dimension.", subjectId: "vector-advla" },
            { day: 13, date: "2026-09-26", target: "Vector Spaces L4, L5, L6: Orthogonal Vectors, Gram-Schmidt Process & Projections.", subjectId: "vector-advla" },
            { day: 14, date: "2026-09-27", target: "Linear Algebra Comprehensive Revision. Solve all GATE DA 2024 & 2025 LA questions.", subjectId: "matrices" }
          ]
        },
        {
          weekNum: 3,
          dates: "Sept 28 - Oct 04, 2026",
          subject: "Probability and Statistics (Part 1)",
          focus: "Permutations, Combinations, Axioms, Conditional Probability, Bayes Theorem",
          lecturesTarget: "Lectures L1 to L15 (Counting to Discrete Random Variables)",
          dailyGoals: [
            { day: 15, date: "2026-09-28", target: "L1, L2, L3: Permutations, Combinations & Decision Table. 15 practice problems.", subjectId: "probability" },
            { day: 16, date: "2026-09-29", target: "L4, L5, L6: Sample Space, Axioms, Independent vs Mutually Exclusive Events.", subjectId: "probability" },
            { day: 17, date: "2026-09-30", target: "L7, L8: Conditional Probability, Multiplication Rule & Law of Total Probability.", subjectId: "probability" },
            { day: 18, date: "2026-10-01", target: "L9, L10: Bayes Theorem in-depth. Practice 20 Bayes problems in Quiz Arena.", subjectId: "probability" },
            { day: 19, date: "2026-10-02", target: "L11, L12: Descriptive Statistics: Mean, Median, Mode, Variance, Covariance.", subjectId: "probability" },
            { day: 20, date: "2026-10-03", target: "L13, L14, L15: Random Variables, PMF, Expectation & Variance properties.", subjectId: "probability" },
            { day: 21, date: "2026-10-04", target: "Probability Part 1 Revision: Drill Bayes & Counting using Virtual Calculator.", subjectId: "probability" }
          ]
        },
        {
          weekNum: 4,
          dates: "Oct 05 - Oct 11, 2026",
          subject: "Probability and Statistics (Part 2)",
          focus: "Distributions (Binomial, Poisson, Normal, t, Chi-square), CLT, Hypothesis Testing",
          lecturesTarget: "Lectures L16 to L35 (Continuous Distributions & Hypothesis Tests)",
          dailyGoals: [
            { day: 22, date: "2026-10-05", target: "L16, L17, L18: Discrete Distributions: Bernoulli, Binomial, Geometric.", subjectId: "probability" },
            { day: 23, date: "2026-10-06", target: "L19, L20, L21: Poisson Distribution & Continuous PDF/CDF basics.", subjectId: "probability" },
            { day: 24, date: "2026-10-07", target: "L22, L23, L24: Uniform and Exponential Distributions, Memoryless Property.", subjectId: "probability" },
            { day: 25, date: "2026-10-08", target: "L25, L26, L27: Normal & Standard Normal Distribution (Z-tables, empirical rule).", subjectId: "probability" },
            { day: 26, date: "2026-10-09", target: "L28, L29, L30: Central Limit Theorem (CLT) and Joint/Marginal Distributions.", subjectId: "probability" },
            { day: 27, date: "2026-10-10", target: "L31 to L35: Statistical Inference: Confidence Intervals, z-test, t-test, Chi-squared test.", subjectId: "probability" },
            { day: 28, date: "2026-10-11", target: "Full Probability & Statistics Revision: Solve 40 questions in Practice Arena.", subjectId: "probability" }
          ]
        },
        {
          weekNum: 5,
          dates: "Oct 12 - Oct 18, 2026",
          subject: "Calculus and Optimization",
          focus: "Limits, Continuity, Differentiability, Taylor Series, Maxima/Minima, Gradient Descent",
          lecturesTarget: "Lectures L1 to L18 (Calculus Complete)",
          dailyGoals: [
            { day: 29, date: "2026-10-12", target: "L1, L2, L3: Functions, Domain, Range, Composite and Inverse Functions.", subjectId: "calculus-opt" },
            { day: 30, date: "2026-10-13", target: "L4 to L7: Limits, Left/Right limits, Limit at Infinity, L'Hopital's Rule.", subjectId: "calculus-opt" },
            { day: 31, date: "2026-10-14", target: "L8, L9: Continuity and Intermediate Value Theorem.", subjectId: "calculus-opt" },
            { day: 32, date: "2026-10-15", target: "L10, L11: Differentiability, Mean Value Theorems (Rolle's & Lagrange).", subjectId: "calculus-opt" },
            { day: 33, date: "2026-10-16", target: "L12, L13, L14: Single-Variable Optimization, Critical Points, Local/Global Extrema.", subjectId: "calculus-opt" },
            { day: 34, date: "2026-10-17", target: "L15, L16, L17: Taylor and Maclaurin Series Expansions & Approximation.", subjectId: "calculus-opt" },
            { day: 35, date: "2026-10-18", target: "L18: Calculus GATE PYQs Solutions 1-23 + Calculus Handbook review.", subjectId: "calculus-opt" }
          ]
        },
        {
          weekNum: 6,
          dates: "Oct 19 - Oct 25, 2026",
          subject: "Programming in Python & Data Structures",
          focus: "Python Core, Lists/Tuples/Dicts, Searching, Sorting, Complexity Analysis",
          lecturesTarget: "Lectures L1 to L25 (Python Basics & DSA Foundations)",
          dailyGoals: [
            { day: 36, date: "2026-10-19", target: "L1 to L5: Python Basics: Variables, Identifiers, Operators, Control Flow.", subjectId: "python" },
            { day: 37, date: "2026-10-20", target: "L6 to L10: Strings, Lists, Tuples, Dictionaries, Sets, Comprehensions.", subjectId: "python" },
            { day: 38, date: "2026-10-21", target: "L11 to L15: Functions, Scope, Recursion, Lambda functions.", subjectId: "python" },
            { day: 39, date: "2026-10-22", target: "L16 to L20: Linear Data Structures: Stacks, Queues, Linked Lists.", subjectId: "python" },
            { day: 40, date: "2026-10-23", target: "L21 to L25: Search & Sort: Binary Search, Bubble, Selection, Insertion, Merge Sort.", subjectId: "python" },
            { day: 41, date: "2026-10-24", target: "Asymptotic Notation: Big-O, Theta, Omega, Master Theorem recurrences.", subjectId: "python" },
            { day: 42, date: "2026-10-25", target: "Phase 1 Consolidation Exam: 3-Hour Combined Test on Math & Python.", subjectId: "python" }
          ]
        }
      ]
    },
    {
      phaseId: 2,
      name: "Phase 2: Core Data Science, DBMS & Machine Learning (Weeks 7 - 12 | Oct 26 - Dec 06)",
      goal: "Conquer DBMS, Data Warehousing, Supervised & Unsupervised ML (~40 marks)",
      weeks: [
        {
          weekNum: 7,
          dates: "Oct 26 - Nov 01, 2026",
          subject: "Database Management Systems (Part 1)",
          focus: "ER Model, Relational Algebra, Tuple Calculus, SQL Queries",
          lecturesTarget: "Lectures L1 to L25 (DBMS Core)",
          dailyGoals: [
            { day: 43, date: "2026-10-26", target: "L1 to L4: Intro to DBMS, 3-Schema Architecture, Data Independence.", subjectId: "dbms" },
            { day: 44, date: "2026-10-27", target: "L5 to L10: ER Modeling, Cardinality, Weak Entities, ER-to-Relational mapping.", subjectId: "dbms" },
            { day: 45, date: "2026-10-28", target: "L11 to L16: Relational Algebra: Select, Project, Cartesian Product, Joins, Division.", subjectId: "dbms" },
            { day: 46, date: "2026-10-29", target: "L17 to L20: Relational Calculus (TRC and DRC basics) with examples.", subjectId: "dbms" },
            { day: 47, date: "2026-10-30", target: "L21 to L25: SQL DDL, DML, Integrity Constraints, Foreign Keys.", subjectId: "dbms" },
            { day: 48, date: "2026-10-31", target: "Complex SQL: Joins, Nested Queries, Aggregations, GROUP BY, HAVING.", subjectId: "dbms" },
            { day: 49, date: "2026-11-01", target: "DBMS Part 1 Practice: Solve 30 Relational Algebra and SQL problems.", subjectId: "dbms" }
          ]
        },
        {
          weekNum: 8,
          dates: "Nov 02 - Nov 08, 2026",
          subject: "Database Management Systems (Part 2)",
          focus: "Normalization (1NF-BCNF), Lossless Join, B+ Trees, Transactions",
          lecturesTarget: "Lectures L26 to L68 (Normalization, Indexing & Concurrency)",
          dailyGoals: [
            { day: 50, date: "2026-11-02", target: "L26 to L32: Functional Dependencies, Closure of Attribute Set, Finding Candidate Keys.", subjectId: "dbms" },
            { day: 51, date: "2026-11-03", target: "L33 to L40: Normal Forms: 1NF, 2NF, 3NF, BCNF. Lossless Join condition.", subjectId: "dbms" },
            { day: 52, date: "2026-11-04", target: "L41 to L48: Dependency Preservation. Normalization practice problems.", subjectId: "dbms" },
            { day: 53, date: "2026-11-05", target: "L49 to L56: File Organization & Indexing: B-Trees and B+ Trees order calculations.", subjectId: "dbms" },
            { day: 54, date: "2026-11-06", target: "L57 to L63: Transactions, ACID Properties, Conflict and View Serializability.", subjectId: "dbms" },
            { day: 55, date: "2026-11-07", target: "L64 to L68: Concurrency Control, Two-Phase Locking (2PL), Deadlocks.", subjectId: "dbms" },
            { day: 56, date: "2026-11-08", target: "Complete DBMS Revision: Solve all GATE DA 2024/2025 DBMS questions.", subjectId: "dbms" }
          ]
        },
        {
          weekNum: 9,
          dates: "Nov 09 - Nov 15, 2026",
          subject: "Data Warehousing & Data Mining",
          focus: "Star/Snowflake Schema, OLAP, Preprocessing, Apriori Algorithm",
          lecturesTarget: "Lectures L1 to L21 (Complete Data Warehousing)",
          dailyGoals: [
            { day: 57, date: "2026-11-09", target: "L1 to L3: Intro to Data Warehousing, Operational DB vs Data Warehouse.", subjectId: "datamining" },
            { day: 58, date: "2026-11-10", target: "L4 to L7: Data Cleaning, Missing Values, Noisy Data, Outlier detection.", subjectId: "datamining" },
            { day: 59, date: "2026-11-11", target: "L8 to L12: Data Reduction, Discretization, Concept Hierarchies.", subjectId: "datamining" },
            { day: 60, date: "2026-11-12", target: "L13 to L16: Multidimensional Data Model: Star, Snowflake, Fact Constellation.", subjectId: "datamining" },
            { day: 61, date: "2026-11-13", target: "L17 to L19: OLAP Operations: Roll-up, Drill-down, Slice, Dice, Pivot.", subjectId: "datamining" },
            { day: 62, date: "2026-11-14", target: "L20, L21: Association Rule Mining: Apriori Algorithm, Support, Confidence, Lift.", subjectId: "datamining" },
            { day: 63, date: "2026-11-15", target: "Data Warehousing Handbook review + Solve 25 practice questions.", subjectId: "datamining" }
          ]
        },
        {
          weekNum: 10,
          dates: "Nov 16 - Nov 22, 2026",
          subject: "Supervised Machine Learning (Part 1)",
          focus: "Linear Regression, Ridge, Lasso, Logistic Regression, Evaluation Metrics",
          lecturesTarget: "Lectures L1 to L25 (Regression, Classification & Metrics)",
          dailyGoals: [
            { day: 64, date: "2026-11-16", target: "L1 to L4: ML Workflow, Supervised vs Unsupervised, Bias-Variance Trade-off.", subjectId: "ml-supervised" },
            { day: 65, date: "2026-11-17", target: "L5 to L8: Simple & Multiple Linear Regression: OLS derivation, RSS, R², TSS.", subjectId: "ml-supervised" },
            { day: 66, date: "2026-11-18", target: "L9 to L12: Ridge Regression (L2) & Lasso (L1). Closed-form formulas.", subjectId: "ml-supervised" },
            { day: 67, date: "2026-11-19", target: "L13 to L16: Logistic Regression: Odds, Logit, Sigmoid, Cross-Entropy Loss.", subjectId: "ml-supervised" },
            { day: 68, date: "2026-11-20", target: "L17 to L20: Evaluation Metrics: Confusion Matrix, Precision, Recall, F1, ROC-AUC.", subjectId: "ml-supervised" },
            { day: 69, date: "2026-11-21", target: "L21 to L25: k-Nearest Neighbors (k-NN), Distance metrics, Curse of Dimensionality.", subjectId: "ml-supervised" },
            { day: 70, date: "2026-11-22", target: "Solve 25 ML Regression and Classification problems in Practice Arena.", subjectId: "ml-supervised" }
          ]
        },
        {
          weekNum: 11,
          dates: "Nov 23 - Nov 29, 2026",
          subject: "Supervised Machine Learning (Part 2)",
          focus: "Naive Bayes, SVM, Decision Trees, MLP Neural Networks",
          lecturesTarget: "Lectures L26 to L50 (Advanced Supervised Models)",
          dailyGoals: [
            { day: 71, date: "2026-11-23", target: "L26 to L30: Naive Bayes: Gaussian, Multinomial, Laplace Smoothing, MAP.", subjectId: "ml-supervised" },
            { day: 72, date: "2026-11-24", target: "L31 to L35: Decision Trees: Shannon Entropy, Information Gain, Gini Impurity.", subjectId: "ml-supervised" },
            { day: 73, date: "2026-11-25", target: "L36 to L40: Support Vector Machines: Hard Margin, Soft Margin, Support Vectors.", subjectId: "ml-supervised" },
            { day: 74, date: "2026-11-26", target: "L41 to L44: Kernel Trick (RBF, Polynomial) and Margin Maximization math.", subjectId: "ml-supervised" },
            { day: 75, date: "2026-11-27", target: "L45 to L48: Multi-Layer Perceptron (MLP), Activation Functions, Forward pass.", subjectId: "ml-supervised" },
            { day: 76, date: "2026-11-28", target: "L49, L50: Backpropagation algorithm, Gradient Descent variants (SGD, Adam).", subjectId: "ml-supervised" },
            { day: 77, date: "2026-11-29", target: "Complete Supervised ML Revision. Review ML Handbook.", subjectId: "ml-supervised" }
          ]
        },
        {
          weekNum: 12,
          dates: "Nov 30 - Dec 06, 2026",
          subject: "Unsupervised Learning & Artificial Intelligence",
          focus: "K-Means, K-Medoids, Hierarchical Clustering, PCA, A* Search",
          lecturesTarget: "Lectures L1 to L11 (Unsupervised) + AI Search Syllabus",
          dailyGoals: [
            { day: 78, date: "2026-11-30", target: "L1 to L3: Intro to Unsupervised Learning & K-Means: WCSS, Lloyd's Algorithm.", subjectId: "ml-unsupervised" },
            { day: 79, date: "2026-12-01", target: "L4 to L6: K-Medoids (PAM), Elbow Method, Silhouette Analysis.", subjectId: "ml-unsupervised" },
            { day: 80, date: "2026-12-02", target: "L7, L8: Hierarchical Clustering: Agglomerative, Single/Complete Linkage.", subjectId: "ml-unsupervised" },
            { day: 81, date: "2026-12-03", target: "L9 to L11: Principal Component Analysis (PCA): Covariance Matrix, Eigenvectors.", subjectId: "ml-unsupervised" },
            { day: 82, date: "2026-12-04", target: "AI Search: BFS, DFS, Uniform Cost Search, A* Algorithm (Admissible & Consistent).", subjectId: "ml-unsupervised" },
            { day: 83, date: "2026-12-05", target: "AI Logic: Propositional & First-Order Logic, Truth tables, Resolution.", subjectId: "ml-unsupervised" },
            { day: 84, date: "2026-12-06", target: "Phase 2 Comprehensive Test: 3 Hours (DBMS + Warehousing + ML + AI).", subjectId: "ml-unsupervised" }
          ]
        }
      ]
    },
    {
      phaseId: 3,
      name: "Phase 3: High-Intensity Problem Solving & PYQ Mastery (Weeks 13 - 17 | Dec 07 - Jan 10)",
      goal: "Solve every GATE DA PYQ, master TCS iON Calculator, eliminate calculation errors",
      weeks: [
        {
          weekNum: 13,
          dates: "Dec 07 - Dec 13, 2026",
          subject: "GATE DA 2024 & 2025 Paper Analysis",
          focus: "Solve actual exam questions under timed conditions",
          lecturesTarget: "Full Official Question Papers",
          dailyGoals: [
            { day: 85, date: "2026-12-07", target: "Solve GATE DA 2024 Paper: Questions 1 to 35 (General Aptitude + 1-mark Core).", subjectId: "matrices" },
            { day: 86, date: "2026-12-08", target: "Solve GATE DA 2024 Paper: Questions 36 to 65 (2-mark Core questions).", subjectId: "ml-supervised" },
            { day: 87, date: "2026-12-09", target: "GATE DA 2024 Error Analysis: Categorize every missed question into Error Notebook.", subjectId: "probability" },
            { day: 88, date: "2026-12-10", target: "Solve GATE DA 2025 Paper: Questions 1 to 35 under timed conditions.", subjectId: "dbms" },
            { day: 89, date: "2026-12-11", target: "Solve GATE DA 2025 Paper: Questions 36 to 65.", subjectId: "python" },
            { day: 90, date: "2026-12-12", target: "GATE DA 2025 Error Analysis & Review of tricky MSQ/NAT questions.", subjectId: "calculus-opt" },
            { day: 91, date: "2026-12-13", target: "Full revision of Linear Algebra & Probability formula sheets.", subjectId: "matrices" }
          ]
        },
        {
          weekNum: 14,
          dates: "Dec 14 - Dec 20, 2026",
          subject: "Advanced Problem Drilling (Math & ML)",
          focus: "Toughest NAT and MSQ questions from Walpole, Strang, and Bishop",
          lecturesTarget: "Problem Sets & Arena",
          dailyGoals: [
            { day: 92, date: "2026-12-14", target: "Linear Algebra Hard Problem Set: Orthogonal Projections, SVD singular values.", subjectId: "matrices" },
            { day: 93, date: "2026-12-15", target: "Probability Hard Problem Set: Joint continuous distributions, conditional expectation.", subjectId: "probability" },
            { day: 94, date: "2026-12-16", target: "Hypothesis Testing Drilling: Calculating z-stats, t-stats, and p-values.", subjectId: "probability" },
            { day: 95, date: "2026-12-17", target: "Supervised ML Math Drilling: OLS matrix calculations, Ridge inversion, Log-loss.", subjectId: "ml-supervised" },
            { day: 96, date: "2026-12-18", target: "SVM & Decision Tree Drilling: Support vectors, Lagrange multipliers, Entropy math.", subjectId: "ml-supervised" },
            { day: 97, date: "2026-12-19", target: "PCA & K-Means Math: Covariance matrix eigenvalues, cluster centroids.", subjectId: "ml-unsupervised" },
            { day: 98, date: "2026-12-20", target: "Sectional Mock Test: Math + ML (65 marks) using GATE Virtual Calculator.", subjectId: "matrices" }
          ]
        },
        {
          weekNum: 15,
          dates: "Dec 21 - Dec 27, 2026",
          subject: "Advanced Problem Drilling (DBMS & Python/DSA)",
          focus: "B+ Tree order calculations, Normalization, SQL and Complexity",
          lecturesTarget: "DBMS & Python Problem Sets",
          dailyGoals: [
            { day: 99, date: "2026-12-21", target: "B+ Tree Indexing Deep Dive: Internal vs Leaf node capacity calculations.", subjectId: "dbms" },
            { day: 100, date: "2026-12-22", target: "Normalization Drills: Testing 3NF vs BCNF and lossless join verification.", subjectId: "dbms" },
            { day: 101, date: "2026-12-23", target: "Concurrency & Schedules: Conflict serializability precedence graphs, 2PL.", subjectId: "dbms" },
            { day: 102, date: "2026-12-24", target: "Python Recursion & Complexity: Master theorem cases, hash collision scenarios.", subjectId: "python" },
            { day: 103, date: "2026-12-25", target: "Graph Algorithms: Dijkstra shortest path, BFS/DFS traversal questions.", subjectId: "python" },
            { day: 104, date: "2026-12-26", target: "Data Warehousing & Apriori: Calculating support, confidence, and candidate sets.", subjectId: "datamining" },
            { day: 105, date: "2026-12-27", target: "Sectional Mock Test: DBMS + Warehousing + Python (35 marks).", subjectId: "dbms" }
          ]
        },
        {
          weekNum: 16,
          dates: "Dec 28 - Jan 03, 2027",
          subject: "Full Syllabus Speed Building & General Aptitude",
          focus: "Solve questions in under 2.5 minutes, General Aptitude guaranteed 12+ marks",
          lecturesTarget: "Mixed Topic Quizzes",
          dailyGoals: [
            { day: 106, date: "2026-12-28", target: "General Aptitude: Quantitative Aptitude (Ratio, Work, Speed, Geometry).", subjectId: "probability" },
            { day: 107, date: "2026-12-29", target: "General Aptitude: Analytical & Spatial Aptitude (Paper folding, Logic).", subjectId: "probability" },
            { day: 108, date: "2026-12-30", target: "Mixed Speed Quiz 1: 30 Questions across all 9 subjects in 60 minutes.", subjectId: "matrices" },
            { day: 109, date: "2026-12-31", target: "Mixed Speed Quiz 2: 30 Questions with emphasis on Numerical Answer Type (NAT).", subjectId: "ml-supervised" },
            { day: 110, date: "2027-01-01", target: "New Year Full Mock Exam 1: 3 Hours strictly 9:30 AM to 12:30 PM.", subjectId: "matrices" },
            { day: 111, date: "2027-01-02", target: "Detailed Mock 1 Analysis: Pinpoint exact calculation traps and time sinks.", subjectId: "dbms" },
            { day: 112, date: "2027-01-03", target: "Formula Revision Day: Re-write every formula on a blank sheet of paper.", subjectId: "calculus-opt" }
          ]
        },
        {
          weekNum: 17,
          dates: "Jan 04 - Jan 10, 2027",
          subject: "Full-Length Mocks Sprint (Mocks 2 & 3)",
          focus: "Exam temperament, Virtual Calculator muscle memory, negative marking elimination",
          lecturesTarget: "Full Mocks & Review",
          dailyGoals: [
            { day: 113, date: "2027-01-04", target: "Full Mock Exam 2 (9:30 AM - 12:30 PM). Strict exam environment.", subjectId: "matrices" },
            { day: 114, date: "2027-01-05", target: "Mock 2 Post-Mortem Analysis & revise weak topics.", subjectId: "probability" },
            { day: 115, date: "2027-01-06", target: "Targeted Revision: Linear Algebra & Calculus critical theorems.", subjectId: "calculus-opt" },
            { day: 116, date: "2027-01-07", target: "Full Mock Exam 3 (9:30 AM - 12:30 PM).", subjectId: "ml-supervised" },
            { day: 117, date: "2027-01-08", target: "Mock 3 Post-Mortem Analysis.", subjectId: "dbms" },
            { day: 118, date: "2027-01-09", target: "Targeted Revision: Machine Learning loss functions & evaluation metrics.", subjectId: "ml-supervised" },
            { day: 119, date: "2027-01-10", target: "Practice Arena Marathon: Solve 40 NAT questions with zero mistakes.", subjectId: "probability" }
          ]
        }
      ]
    },
    {
      phaseId: 4,
      name: "Phase 4: Final Peak Sprint & AIR Maximization (Weeks 18 - 21 | Jan 11 - Feb 05)",
      goal: "Mocks 4 to 8, Rapid Daily Revision, Peak Physical & Mental Performance",
      weeks: [
        {
          weekNum: 18,
          dates: "Jan 11 - Jan 17, 2027",
          subject: "Peak Simulation (Mocks 4 & 5)",
          focus: "Score 65+ consistently on full-length mocks",
          lecturesTarget: "Full Mocks",
          dailyGoals: [
            { day: 120, date: "2027-01-11", target: "Full Mock Exam 4 (9:30 AM - 12:30 PM).", subjectId: "matrices" },
            { day: 121, date: "2027-01-12", target: "Mock 4 In-depth Analysis & Error Log update.", subjectId: "probability" },
            { day: 122, date: "2027-01-13", target: "DBMS & Warehousing Rapid Review (all schemas and normal form rules).", subjectId: "dbms" },
            { day: 123, date: "2027-01-14", target: "Full Mock Exam 5 (9:30 AM - 12:30 PM).", subjectId: "ml-supervised" },
            { day: 124, date: "2027-01-15", target: "Mock 5 In-depth Analysis.", subjectId: "python" },
            { day: 125, date: "2027-01-16", target: "Probability & Statistics complete formula and distribution audit.", subjectId: "probability" },
            { day: 126, date: "2027-01-17", target: "General Aptitude 50-Question Marathon.", subjectId: "matrices" }
          ]
        },
        {
          weekNum: 19,
          dates: "Jan 18 - Jan 24, 2027",
          subject: "Final Mocks (Mocks 6 & 7)",
          focus: "Lock down time management strategy (10 mins GA, 70 mins 1-mark, 90 mins 2-mark, 10 mins review)",
          lecturesTarget: "Full Mocks & Speed",
          dailyGoals: [
            { day: 127, date: "2027-01-18", target: "Full Mock Exam 6 (9:30 AM - 12:30 PM).", subjectId: "matrices" },
            { day: 128, date: "2027-01-19", target: "Mock 6 Analysis: Verify accuracy rate is > 85%.", subjectId: "ml-supervised" },
            { day: 129, date: "2027-01-20", target: "Linear Algebra & SVD / PCA comprehensive mathematical review.", subjectId: "matrices" },
            { day: 130, date: "2027-01-21", target: "Full Mock Exam 7 (9:30 AM - 12:30 PM).", subjectId: "probability" },
            { day: 131, date: "2027-01-22", target: "Mock 7 Analysis & review of all incorrect questions from past mocks.", subjectId: "dbms" },
            { day: 132, date: "2027-01-23", target: "Python data structures & algorithmic recurrence relations revision.", subjectId: "python" },
            { day: 133, date: "2027-01-24", target: "AI Search & Logic revision: A* consistency and truth tables.", subjectId: "ml-unsupervised" }
          ]
        },
        {
          weekNum: 20,
          dates: "Jan 25 - Jan 31, 2027",
          subject: "Final Mock 8 & Grand Revision",
          focus: "Final full mock test, review Error Notebook completely",
          lecturesTarget: "Grand Review",
          dailyGoals: [
            { day: 134, date: "2027-01-25", target: "Final Full Mock Exam 8 (9:30 AM - 12:30 PM). Celebrate scoring 70+!", subjectId: "matrices" },
            { day: 135, date: "2027-01-26", target: "Final Mock 8 Analysis & full review of your personal Study Journal notes.", subjectId: "probability" },
            { day: 136, date: "2027-01-27", target: "Linear Algebra Grand Review: All identities, rank relations, eigenvalues.", subjectId: "matrices" },
            { day: 137, date: "2027-01-28", target: "Probability & Statistics Grand Review: All PMF/PDFs, means, variances, tests.", subjectId: "probability" },
            { day: 138, date: "2027-01-29", target: "Machine Learning Grand Review: All algorithms, loss functions, metrics.", subjectId: "ml-supervised" },
            { day: 139, date: "2027-01-30", target: "DBMS & Warehousing Grand Review: B+ Trees, Normal Forms, OLAP.", subjectId: "dbms" },
            { day: 140, date: "2027-01-31", target: "Calculus & Python Grand Review: Taylor series, critical points, sorting complexities.", subjectId: "calculus-opt" }
          ]
        },
        {
          weekNum: 21,
          dates: "Feb 01 - Feb 06, 2027",
          subject: "Exam Week Taper & Peak Confidence",
          focus: "Zero heavy studying, formula flashcards, sleep cycle alignment, peak calmness",
          lecturesTarget: "Taper & Relax",
          dailyGoals: [
            { day: 141, date: "2027-02-01", target: "Light review: Read Formula Cheatsheet once. Sleep strictly by 10:30 PM.", subjectId: "matrices" },
            { day: 142, date: "2027-02-02", target: "Review Error Notebook: Only look at concepts you previously stumbled on.", subjectId: "probability" },
            { day: 143, date: "2027-02-03", target: "10-minute Virtual Calculator practice to keep fingers warm. 15 mins GA.", subjectId: "calculus-opt" },
            { day: 144, date: "2027-02-04", target: "Print Admit Card, check ID proof, organize stationery. Light walk.", subjectId: "matrices" },
            { day: 145, date: "2027-02-05", target: "Pre-Exam Day: NO STUDYING AFTER 4 PM. Relax, hydrate, sleep early.", subjectId: "matrices" },
            { day: 146, date: "2027-02-06", target: "🎯 GATE DA 2027 EXAM DAY! Stay calm, execute your strategy, crack AIR 1-50!", subjectId: "matrices" }
          ]
        }
      ]
    }
  ]
};

var GATE_DA_PLAN = window.GATE_DA_PLAN;
if (typeof module !== "undefined") {
  module.exports = window.GATE_DA_PLAN;
}
