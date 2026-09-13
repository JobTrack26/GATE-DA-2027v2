var GATE_DA_SYLLABUS = window.GATE_DA_SYLLABUS;
/**
 * Official GATE DA (Data Science & Artificial Intelligence) 2027 Syllabus & Strategy Guide
 * Paper Code: DA | Full Marks: 100 | Duration: 3 Hours (180 mins) | Questions: 65
 */

window.GATE_DA_SYLLABUS = {
  examPattern: {
    paperCode: "DA",
    paperName: "Data Science & Artificial Intelligence",
    duration: "3 Hours (180 Minutes)",
    totalQuestions: 65,
    totalMarks: 100,
    sections: [
      { name: "General Aptitude (GA)", questions: 10, marks: 15, questionTypes: "5 x 1-mark + 5 x 2-mark" },
      { name: "Technical / Core Subjects", questions: 55, marks: 85, questionTypes: "25 x 1-mark + 30 x 2-mark" }
    ],
    questionFormats: [
      { type: "MCQ", name: "Multiple Choice Questions", desc: "4 options, 1 correct. Negative marking: 1/3 for 1-mark, 2/3 for 2-mark." },
      { type: "MSQ", name: "Multiple Select Questions", desc: "1 or more options correct. NO partial marking, NO negative marking." },
      { type: "NAT", name: "Numerical Answer Type", desc: "Real number input via virtual keyboard. NO negative marking." }
    ]
  },

  weightageAnalysis: [
    { subject: "Probability & Statistics", marksRange: "14 - 16 Marks", weightagePct: 15, difficulty: "Moderate to High", yield: "Very High" },
    { subject: "Linear Algebra & Vector Spaces", marksRange: "12 - 14 Marks", weightagePct: 13, difficulty: "Moderate", yield: "Very High" },
    { subject: "Machine Learning (Supervised & Unsupervised)", marksRange: "16 - 18 Marks", weightagePct: 17, difficulty: "Moderate to Tough", yield: "Highest" },
    { subject: "Database Systems & Data Warehousing", marksRange: "14 - 16 Marks", weightagePct: 15, difficulty: "Easy to Moderate", yield: "High (Scoring)" },
    { subject: "Python Programming & DSA", marksRange: "12 - 14 Marks", weightagePct: 13, difficulty: "Moderate", yield: "High" },
    { subject: "General Aptitude", marksRange: "15 Marks", weightagePct: 15, difficulty: "Easy to Moderate", yield: "Guaranteed 12+" },
    { subject: "Calculus & Optimization", marksRange: "6 - 8 Marks", weightagePct: 7, difficulty: "Moderate", yield: "Medium" },
    { subject: "Artificial Intelligence (Search & Logic)", marksRange: "5 - 7 Marks", weightagePct: 5, difficulty: "Moderate", yield: "Medium" }
  ],

  sections: [
    {
      id: "prob-stats",
      name: "Probability and Statistics",
      weightage: "~15 Marks",
      badge: "Crucial Foundation",
      topics: [
        { id: "ps-1", title: "Counting: Permutations and Combinations", highYield: true },
        { id: "ps-2", title: "Probability Axioms, Sample Space, Independent & Mutually Exclusive Events", highYield: true },
        { id: "ps-3", title: "Marginal, Conditional, and Joint Probability", highYield: true },
        { id: "ps-4", title: "Bayes Theorem and Law of Total Probability", highYield: true },
        { id: "ps-5", title: "Conditional Expectation and Variance", highYield: false },
        { id: "ps-6", title: "Descriptive Stats: Mean, Median, Mode, Standard Deviation, Covariance & Correlation", highYield: true },
        { id: "ps-7", title: "Discrete Random Variables & PMF: Uniform, Bernoulli, Binomial", highYield: true },
        { id: "ps-8", title: "Continuous Random Variables & PDF: Uniform, Exponential, Poisson, Normal, Standard Normal", highYield: true },
        { id: "ps-9", title: "Sampling Distributions: t-distribution, Chi-squared distribution", highYield: false },
        { id: "ps-10", title: "Cumulative Distribution Function (CDF) and Conditional PDF", highYield: true },
        { id: "ps-11", title: "Central Limit Theorem (CLT) & Law of Large Numbers", highYield: true },
        { id: "ps-12", title: "Statistical Inference: Confidence Intervals, z-test, t-test, Chi-squared test", highYield: true }
      ]
    },
    {
      id: "linear-algebra",
      name: "Linear Algebra & Vector Spaces",
      weightage: "~13 Marks",
      badge: "Core Mathematical Engine",
      topics: [
        { id: "la-1", title: "Vector Spaces, Subspaces, Linear Dependence and Independence", highYield: true },
        { id: "la-2", title: "Basis, Dimension, Row Space, Column Space, Null Space", highYield: true },
        { id: "la-3", title: "Rank of a Matrix and Rank-Nullity Theorem", highYield: true },
        { id: "la-4", title: "System of Linear Equations (Gaussian elimination, consistency, Ax=b)", highYield: true },
        { id: "la-5", title: "Eigenvalues and Eigenvectors, Characteristic Polynomial", highYield: true },
        { id: "la-6", title: "Cayley-Hamilton Theorem and Matrix Powers/Inverses", highYield: true },
        { id: "la-7", title: "Symmetric, Skew-Symmetric, Hermitian, and Orthogonal Matrices", highYield: true },
        { id: "la-8", title: "Orthogonal Vectors, Gram-Schmidt Orthogonalization Process", highYield: true },
        { id: "la-9", title: "Projection Vectors and Projection Matrices", highYield: true },
        { id: "la-10", title: "LU Decomposition and Matrix Factorization", highYield: false },
        { id: "la-11", title: "Singular Value Decomposition (SVD) and Pseudoinverse", highYield: true }
      ]
    },
    {
      id: "calculus-opt",
      name: "Calculus and Optimization",
      weightage: "~7 Marks",
      badge: "Essential for ML Gradients",
      topics: [
        { id: "co-1", title: "Functions of Single Variable: Domain, Range, Limits", highYield: false },
        { id: "co-2", title: "Continuity and Differentiability (L'Hopital Rule)", highYield: true },
        { id: "co-3", title: "Taylor Series and Maclaurin Series Expansions", highYield: true },
        { id: "co-4", title: "Maxima, Minima, Critical Points, Point of Inflection", highYield: true },
        { id: "co-5", title: "Unconstrained Optimization: First & Second Derivative Tests", highYield: true },
        { id: "co-6", title: "Gradient Descent and Step Size / Learning Rate", highYield: true }
      ]
    },
    {
      id: "python-dsa",
      name: "Programming in Python, Data Structures & Algorithms",
      weightage: "~13 Marks",
      badge: "Practical Problem Solving",
      topics: [
        { id: "py-1", title: "Python Syntax, Variables, Operators, Control Flow, Functions", highYield: false },
        { id: "py-2", title: "Built-in Data Structures: Lists, Tuples, Dictionaries, Sets, Comprehensions", highYield: true },
        { id: "py-3", title: "Linear Data Structures: Stacks, Queues, Linked Lists", highYield: true },
        { id: "py-4", title: "Non-Linear Structures: Trees, Binary Search Trees (BST), Heaps, Hash Tables", highYield: true },
        { id: "py-5", title: "Searching: Linear Search, Binary Search", highYield: true },
        { id: "py-6", title: "Sorting: Selection Sort, Bubble Sort, Insertion Sort, Merge Sort, Quick Sort", highYield: true },
        { id: "py-7", title: "Asymptotic Notation: Big-O, Omega, Theta, Master Theorem", highYield: true },
        { id: "py-8", title: "Graph Theory: Representations, BFS, DFS Traversals", highYield: true },
        { id: "py-9", title: "Shortest Path: Dijkstra's Algorithm, Bellman-Ford", highYield: true }
      ]
    },
    {
      id: "dbms-mining",
      name: "Database Systems & Data Warehousing",
      weightage: "~15 Marks",
      badge: "High Scoring Section",
      topics: [
        { id: "db-1", title: "Entity-Relationship (ER) Model, Cardinalities, Weak Entities, ER-to-Relational Mapping", highYield: true },
        { id: "db-2", title: "Relational Model & Relational Algebra (Select, Project, Join, Division, Set Ops)", highYield: true },
        { id: "db-3", title: "Tuple Relational Calculus (TRC) & Domain Relational Calculus (DRC)", highYield: false },
        { id: "db-4", title: "SQL Queries: Joins, Nested Queries, Aggregations, GROUP BY, HAVING", highYield: true },
        { id: "db-5", title: "Functional Dependencies & Normalization (1NF, 2NF, 3NF, BCNF)", highYield: true },
        { id: "db-6", title: "Lossless Join and Dependency Preserving Decompositions", highYield: true },
        { id: "db-7", title: "File Organization and Indexing: B-Trees and B+ Trees (Calculations)", highYield: true },
        { id: "db-8", title: "Transactions, ACID Properties, Schedules, Conflict & View Serializability", highYield: true },
        { id: "db-9", title: "Concurrency Control: Two-Phase Locking (2PL), Deadlocks", highYield: true },
        { id: "dw-10", title: "Data Warehousing: Star Schema, Snowflake Schema, Fact & Dimension Tables", highYield: true },
        { id: "dw-11", title: "OLAP Operations: Roll-up, Drill-down, Slice, Dice, Pivot", highYield: true },
        { id: "dw-12", title: "Data Preprocessing: Missing Values, Noisy Data, Data Reduction, Discretization", highYield: true },
        { id: "dw-13", title: "Association Rule Mining: Apriori Algorithm, Support, Confidence, Lift", highYield: true }
      ]
    },
    {
      id: "machine-learning",
      name: "Machine Learning (Supervised & Unsupervised)",
      weightage: "~17 Marks",
      badge: "Highest Deciding Factor",
      topics: [
        { id: "ml-1", title: "Supervised vs Unsupervised vs Reinforcement Learning Paradigms", highYield: false },
        { id: "ml-2", title: "Simple and Multiple Linear Regression, Ordinary Least Squares (OLS), R-squared", highYield: true },
        { id: "ml-3", title: "Ridge and Lasso Regularization (L2 and L1 Norms)", highYield: true },
        { id: "ml-4", title: "Logistic Regression, Sigmoid Activation, Log-Loss / Cross-Entropy Loss", highYield: true },
        { id: "ml-5", title: "Evaluation Metrics: Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC", highYield: true },
        { id: "ml-6", title: "k-Nearest Neighbours (k-NN), Distance Metrics, Impact of k", highYield: true },
        { id: "ml-7", title: "Naive Bayes Classifier, Maximum A Posteriori (MAP), Conditional Independence", highYield: true },
        { id: "ml-8", title: "Linear Discriminant Analysis (LDA), Between-class vs Within-class Variance", highYield: false },
        { id: "ml-9", title: "Support Vector Machines (SVM): Hard/Soft Margin, Hinge Loss, Support Vectors, Kernels", highYield: true },
        { id: "ml-10", title: "Decision Trees: Information Gain, Entropy, Gini Index, Pruning", highYield: true },
        { id: "ml-11", title: "Bias-Variance Decomposition & Trade-off, Overfitting vs Underfitting", highYield: true },
        { id: "ml-12", title: "Cross-Validation: K-Fold, Stratified, Leave-One-Out (LOOCV)", highYield: true },
        { id: "ml-13", title: "Multi-Layer Perceptron (MLP) & Feed-Forward Neural Networks, Backpropagation", highYield: true },
        { id: "ml-14", title: "Clustering: K-Means (Lloyd's Algorithm, WCSS, Elbow Method) and K-Medoids", highYield: true },
        { id: "ml-15", title: "Hierarchical Clustering: Agglomerative, Divisive, Single/Complete/Average Linkage, Dendrograms", highYield: true },
        { id: "ml-16", title: "Dimensionality Reduction: Principal Component Analysis (PCA), Covariance Matrix, Eigenvectors", highYield: true }
      ]
    },
    {
      id: "ai-search",
      name: "Artificial Intelligence",
      weightage: "~6 Marks",
      badge: "Targeted Logic & Search",
      topics: [
        { id: "ai-1", title: "Uninformed Search: Breadth-First (BFS), Depth-First (DFS), Uniform Cost Search", highYield: true },
        { id: "ai-2", title: "Informed Search: A* Search, Admissible & Consistent Heuristics, Greedy Best-First", highYield: true },
        { id: "ai-3", title: "Adversarial Search: Minimax Algorithm, Alpha-Beta Pruning", highYield: true },
        { id: "ai-4", title: "Propositional Logic: Truth Tables, Entailment, Inference Rules, CNF", highYield: true },
        { id: "ai-5", title: "Predicate Logic (First-Order Logic): Quantifiers, Unification, Resolution", highYield: true },
        { id: "ai-6", title: "Reasoning Under Uncertainty: Conditional Independence, Bayesian Networks", highYield: true },
        { id: "ai-7", title: "Exact Inference by Variable Elimination & Approximate Inference by Sampling", highYield: false }
      ]
    }
  ],

  roadmap: [
    {
      phase: "Phase 1: Mathematical Foundations & Python (Months 1 - 3)",
      focus: "Build unbreakable base in Linear Algebra, Probability, Calculus, and Python basics.",
      milestones: [
        "Complete Gilbert Strang Linear Algebra & Axler Vector Spaces lectures",
        "Master Probability Distributions (Binomial, Poisson, Normal, t, Chi-square)",
        "Implement and understand Python Data Structures & Asymptotic Notation",
        "Solve 100+ basic and intermediate practice problems in Linear Algebra & Probability"
      ],
      targetCompletion: "25% of GATE DA Syllabus"
    },
    {
      phase: "Phase 2: Database Systems & Classical Machine Learning (Months 4 - 6)",
      focus: "Conquer DBMS (relational algebra, SQL, normal forms, B+ trees) and Supervised ML.",
      milestones: [
        "Master BCNF, 3NF, Lossless Join, and B+ Tree indexing calculations",
        "Deeply understand Linear/Logistic Regression, SVMs, Decision Trees, and Naive Bayes",
        "Master Data Warehousing Schemas (Star, Snowflake) and OLAP operations",
        "Attempt subject-wise mini quizzes and track weak areas"
      ],
      targetCompletion: "60% of GATE DA Syllabus"
    },
    {
      phase: "Phase 3: Advanced ML, Unsupervised Learning, AI & Algorithms (Months 7 - 9)",
      focus: "Tackle PCA, K-Means, Neural Networks, A* Search, Logic, and Graph Algorithms.",
      milestones: [
        "Master PCA derivations (eigenvalue-eigenvector approach) and Clustering metrics",
        "Learn A* Search heuristic admissibility and Alpha-Beta pruning",
        "Practice Dijkstra, BFS/DFS, and Merge/Quick Sort recurrences",
        "Complete first comprehensive syllabus pass across all 9 subjects"
      ],
      targetCompletion: "90% of GATE DA Syllabus"
    },
    {
      phase: "Phase 4: Full-Length Mocks, PYQs & Revision Sprint (Months 10 - 12)",
      focus: "Simulated exam conditions, GATE virtual calculator practice, speed and accuracy.",
      milestones: [
        "Solve GATE DA 2024, 2025, and 2026 official question papers under 3-hour timer",
        "Take 15 - 20 full-length mock tests using the GATE Virtual Calculator replica",
        "Create condensed 1-page formula cheatsheets for daily morning revision",
        "Target: Consistent 70+ score in mock tests for guaranteed top 50 AIR"
      ],
      targetCompletion: "100% Prepared for GATE DA 2027"
    }
  ]
};

if (typeof module !== "undefined") {
  module.exports = GATE_DA_SYLLABUS;
}
