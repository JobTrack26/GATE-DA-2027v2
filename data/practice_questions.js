/** GATE DA Practice Questions with LaTeX Math */
window.GATE_DA_QUESTIONS = [
  {
    "id": "q1",
    "subject": "Linear Algebra",
    "topic": "Eigenvalues & Symmetric Matrices",
    "type": "MCQ",
    "marks": 2,
    "question": "Let $A$ be a $3 \\times 3$ real symmetric matrix with eigenvalues $1, 2,$ and $3$. Let $B = A^2 - 2A + I$, where $I$ is the $3 \\times 3$ identity matrix. What is the determinant of matrix $B$?",
    "options": [
      "A. 0",
      "B. 2",
      "C. 4",
      "D. 8"
    ],
    "correctAnswer": "A",
    "explanation": "If $\\lambda$ is an eigenvalue of $A$, then the eigenvalues of the matrix polynomial $B = f(A) = A^2 - 2A + I$ are given by:\n$$f(\\lambda) = \\lambda^2 - 2\\lambda + 1 = (\\lambda - 1)^2$$\n\nEvaluating for each eigenvalue of $A$:\n- For $\\lambda_1 = 1$: $f(1) = (1 - 1)^2 = 0$\n- For $\\lambda_2 = 2$: $f(2) = (2 - 1)^2 = 1$\n- For $\\lambda_3 = 3$: $f(3) = (3 - 1)^2 = 4$\n\nThe determinant of matrix $B$ is the product of its eigenvalues:\n$$\\det(B) = 0 \\times 1 \\times 4 = 0$$\n\nHence, Option A is correct."
  },
  {
    "id": "q2",
    "subject": "Probability & Statistics",
    "topic": "Bayes Theorem",
    "type": "NAT",
    "marks": 2,
    "question": "In a diagnostic clinic, $2\\%$ of the tested population has a rare medical condition ($P(D) = 0.02$). A test correctly identifies a diseased patient $95\\%$ of the time (Sensitivity $P(T \\mid D) = 0.95$), but produces a false positive in $5\\%$ of healthy individuals ($P(T \\mid D^c) = 0.05$). If a randomly selected individual tests positive, what is the probability (in percentage, rounded to two decimal places) that the individual actually has the condition?",
    "correctAnswer": 27.94,
    "tolerance": [
      27.0,
      29.0
    ],
    "explanation": "Let $D$ = individual has the condition, and $T$ = test result is positive.\nWe are given:\n- Prior: $P(D) = 0.02 \\implies P(D^c) = 0.98$\n- Likelihood: $P(T \\mid D) = 0.95$\n- False positive rate: $P(T \\mid D^c) = 0.05$\n\nApplying Bayes' Theorem:\n$$P(D \\mid T) = \\frac{P(T \\mid D) P(D)}{P(T \\mid D) P(D) + P(T \\mid D^c) P(D^c)}$$\n\nCalculating numerator and denominator:\n- Numerator $= 0.95 \\times 0.02 = 0.019$\n- Denominator $= 0.019 + (0.05 \\times 0.98) = 0.019 + 0.049 = 0.068$\n\n$$P(D \\mid T) = \\frac{0.019}{0.068} = \\frac{19}{68} \\approx 0.27941 \\implies 27.94\\%$$"
  },
  {
    "id": "q3",
    "subject": "Machine Learning",
    "topic": "Bias-Variance & Model Complexity",
    "type": "MSQ",
    "marks": 2,
    "question": "Which of the following statements is/are TRUE regarding the Bias-Variance Trade-off in machine learning? (Select all that apply)",
    "options": [
      "A. Increasing the regularization parameter $\\lambda$ in Ridge Regression decreases model variance but increases bias.",
      "B. In $k$-Nearest Neighbors ($k$-NN), setting $k = 1$ results in minimum bias and maximum variance.",
      "C. Fully grown, unpruned Decision Trees typically suffer from high bias and low variance.",
      "D. Ensemble methods like Bagging (e.g. Random Forest) primarily aim to reduce variance without substantially increasing bias."
    ],
    "correctAnswer": [
      "A",
      "B",
      "D"
    ],
    "explanation": "- Statement A is TRUE: Increasing $\\lambda$ penalizes large coefficients, shrinking them towards zero. This reduces model capacity (lower variance) at the cost of higher bias.\n- Statement B is TRUE: At $k=1$, the model fits every training point perfectly ($0$ training error, minimum bias), but the boundary is heavily susceptible to local noise (maximum variance).\n- Statement C is FALSE: Unpruned decision trees overfit the training data severely, meaning they have VERY LOW BIAS and HIGH VARIANCE.\n- Statement D is TRUE: Bagging aggregates multiple high-variance base estimators, reducing the overall variance of the ensemble."
  },
  {
    "id": "q4",
    "subject": "Database Management Systems",
    "topic": "B+ Tree Indexing",
    "type": "NAT",
    "marks": 2,
    "question": "Consider a B+ tree index where the disk block size is $4096$ bytes, search key size is $12$ bytes, and block pointer size is $8$ bytes. What is the maximum order $p$ (maximum number of block pointers) of an internal node in this B+ tree?",
    "correctAnswer": 205,
    "tolerance": [
      205,
      205
    ],
    "explanation": "For an internal node of order $p$, there are $p$ block pointers and $(p - 1)$ search keys.\n\nThe space condition requires:\n$$p \\cdot P + (p - 1) \\cdot K \\le B$$\n\nSubstituting values ($P = 8$, $K = 12$, $B = 4096$):\n$$8p + 12(p - 1) \\le 4096$$\n$$8p + 12p - 12 \\le 4096$$\n$$20p \\le 4108$$\n$$p \\le \\frac{4108}{20} = 205.4$$\n\nSince order $p$ must be an integer, maximum order $p = 205$."
  },
  {
    "id": "q5",
    "subject": "Programming & Python",
    "topic": "Time Complexity & Hash Maps",
    "type": "MCQ",
    "marks": 1,
    "question": "In Python, what is the average case and worst case time complexity of looking up a key in a standard dictionary (`dict`), assuming $N$ elements?",
    "options": [
      "A. Average: $\\mathcal{O}(1)$, Worst Case: $\\mathcal{O}(N)$",
      "B. Average: $\\mathcal{O}(\\log N)$, Worst Case: $\\mathcal{O}(N)$",
      "C. Average: $\\mathcal{O}(1)$, Worst Case: $\\mathcal{O}(\\log N)$",
      "D. Average: $\\mathcal{O}(1)$, Worst Case: $\\mathcal{O}(1)$"
    ],
    "correctAnswer": "A",
    "explanation": "Python dictionaries use open-addressing hash tables with perturbation-based pseudo-random probing. On average, hashing achieves expected $\\mathcal{O}(1)$ lookup time. In the worst case where all keys hash to colliding buckets, search degrades to $\\mathcal{O}(N)$."
  },
  {
    "id": "q6",
    "subject": "Data Warehousing",
    "topic": "OLAP Operations",
    "type": "MCQ",
    "marks": 1,
    "question": "Which OLAP operation transforms detailed data into aggregated summary data by climbing up a concept hierarchy (e.g., from 'day' $\\to$ 'month' $\\to$ 'quarter')?",
    "options": [
      "A. Drill-down",
      "B. Roll-up",
      "C. Slice",
      "D. Pivot"
    ],
    "correctAnswer": "B",
    "explanation": "Roll-up (drill-up) performs aggregation along a dimension by climbing up a concept hierarchy or reducing dimensions. Drill-down moves in the opposite direction (from summarized to detailed data). Slice selects a single dimension; Pivot rotates the reporting axes."
  },
  {
    "id": "q7",
    "subject": "Calculus & Optimization",
    "topic": "Critical Points & Hessian",
    "type": "MCQ",
    "marks": 2,
    "question": "Consider the function $f(x, y) = x^2 + 4xy + y^2$. What is the nature of the critical point at the origin $(0, 0)$?",
    "options": [
      "A. Local Minimum",
      "B. Local Maximum",
      "C. Saddle Point",
      "D. Inflection Point"
    ],
    "correctAnswer": "C",
    "explanation": "1. Compute first-order partial derivatives:\n$$f_x = 2x + 4y, \\qquad f_y = 4x + 2y$$\nAt $(0, 0)$, $f_x = 0$ and $f_y = 0$, confirming $(0, 0)$ is a critical point.\n\n2. Compute second-order partial derivatives:\n$$f_{xx} = 2, \\qquad f_{yy} = 2, \\qquad f_{xy} = 4$$\n\n3. Construct Hessian matrix $H$:\n$$H = \\begin{pmatrix} 2 & 4 \\\\ 4 & 2 \\end{pmatrix}$$\n\n$$\\det(H) = (2)(2) - (4)(4) = 4 - 16 = -12 < 0$$\n\nSince $\\det(H) < 0$, the Hessian has eigenvalues of opposite signs (indefinite matrix). Therefore, $(0, 0)$ is a Saddle Point."
  },
  {
    "id": "q8",
    "subject": "Artificial Intelligence",
    "topic": "A* Search & Heuristics",
    "type": "MSQ",
    "marks": 2,
    "question": "Which of the following conditions guarantee that $A^*$ graph search will always find an optimal shortest path? (Select all that apply)",
    "options": [
      "A. The heuristic function $h(n)$ is admissible ($h(n) \\le h^*(n)$ for all nodes $n$).",
      "B. The heuristic function $h(n)$ is consistent (monotonic): $h(n) \\le c(n, a, n') + h(n')$.",
      "C. All step costs in the graph are strictly positive ($c > 0$).",
      "D. The search space is explored using Depth-First Search order."
    ],
    "correctAnswer": [
      "B",
      "C"
    ],
    "explanation": "- For GRAPH search (where revisited closed nodes are discarded without reopening), consistency (monotonicity) is required to guarantee optimality. Admissibility alone is sufficient for TREE search, but not for GRAPH search.\n- Step costs must be strictly positive ($c > 0$) to prevent infinite cycles with non-increasing total cost.\nHence, Options B and C are correct."
  }
];
var GATE_DA_QUESTIONS = window.GATE_DA_QUESTIONS;
if (typeof module !== "undefined") { module.exports = window.GATE_DA_QUESTIONS; }
