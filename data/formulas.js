/** High-Yield Formulas for GATE DA 2027 */
window.GATE_DA_FORMULAS = [
  {
    "category": "Linear Algebra",
    "items": [
      {
        "name": "Rank-Nullity Theorem",
        "formula": "\\text{Rank}(A) + \\text{Nullity}(A) = n \\quad (A \\in \\mathbb{R}^{m \\times n})",
        "notes": "$\\text{Nullity}(A)$ is the dimension of the null space $\\text{Ker}(A)$. Column rank always equals Row rank."
      },
      {
        "name": "Eigenvalue Properties",
        "formula": "\\text{Trace}(A) = \\sum_{i=1}^n \\lambda_i, \\qquad \\det(A) = \\prod_{i=1}^n \\lambda_i",
        "notes": "Eigenvalues of triangular/diagonal matrices are the diagonal elements. If $A$ has eigenvalue $\\lambda$, $A^k$ has $\\lambda^k$ and $A^{-1}$ has $\\frac{1}{\\lambda}$."
      },
      {
        "name": "Orthogonal Projection onto Subspace",
        "formula": "P = A(A^T A)^{-1} A^T, \\qquad \\hat{y} = P y",
        "notes": "Projection matrix $P$ is symmetric ($P^T = P$) and idempotent ($P^2 = P$). Residual vector $e = y - \\hat{y}$ is orthogonal to column space of $A$."
      },
      {
        "name": "Singular Value Decomposition (SVD)",
        "formula": "A = U \\Sigma V^T, \\qquad \\sigma_i = \\sqrt{\\lambda_i(A^T A)}",
        "notes": "$U$ ($m \\times m$) and $V$ ($n \\times n$) are orthogonal matrices; $\\Sigma$ is diagonal with singular values in decreasing order $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$."
      },
      {
        "name": "Cayley-Hamilton Theorem",
        "formula": "p(A) = 0 \\quad \\text{where } p(\\lambda) = \\det(A - \\lambda I) = 0",
        "notes": "Every square matrix satisfies its own characteristic equation. Useful for computing high matrix powers $A^n$ and matrix inverse $A^{-1}$."
      }
    ]
  },
  {
    "category": "Probability & Statistics",
    "items": [
      {
        "name": "Bayes' Theorem",
        "formula": "P(A_i \\mid B) = \\frac{P(B \\mid A_i) P(A_i)}{\\sum_{j=1}^k P(B \\mid A_j) P(A_j)}",
        "notes": "$\\text{Posterior} = \\frac{\\text{Likelihood} \\times \\text{Prior}}{\\text{Evidence}}$. Fundamental for Naive Bayes classification."
      },
      {
        "name": "Variance & Covariance",
        "formula": "\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2, \\qquad \\text{Cov}(X, Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]",
        "notes": "$\\text{Var}(aX + bY) = a^2 \\text{Var}(X) + b^2 \\text{Var}(Y) + 2ab \\text{Cov}(X, Y)$. If $X$ and $Y$ are independent, $\\text{Cov}(X, Y) = 0$."
      },
      {
        "name": "Correlation Coefficient",
        "formula": "\\rho(X, Y) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}, \\qquad -1 \\le \\rho(X, Y) \\le 1",
        "notes": "Measures linear relationship. Independent variables have $\\rho = 0$, but $\\rho = 0$ does NOT imply independence in general."
      },
      {
        "name": "Binomial Distribution",
        "formula": "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\qquad \\mathbb{E}[X] = np, \\quad \\text{Var}(X) = np(1-p)",
        "notes": "Discrete distribution for number of successes in $n$ independent Bernoulli trials with probability of success $p$."
      },
      {
        "name": "Poisson Distribution",
        "formula": "P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\qquad \\mathbb{E}[X] = \\lambda, \\quad \\text{Var}(X) = \\lambda",
        "notes": "Used for modeling event arrival counts. Notice $\\text{Mean} = \\text{Variance} = \\lambda$."
      },
      {
        "name": "Standard Normal Transformation (Z-Score)",
        "formula": "Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)",
        "notes": "68.2% within $1\\sigma$, 95.4% within $2\\sigma$, 99.7% within $3\\sigma$ (Empirical Rule)."
      }
    ]
  },
  {
    "category": "Machine Learning",
    "items": [
      {
        "name": "Ordinary Least Squares (OLS) Solution",
        "formula": "\\hat{\\theta} = (X^T X)^{-1} X^T y",
        "notes": "Closed-form solution for linear regression. Requires $X^T X$ to be invertible (full column rank $p$)."
      },
      {
        "name": "Ridge Regression (L2 Regularization)",
        "formula": "\\hat{\\theta}_{\\text{ridge}} = (X^T X + \\lambda I)^{-1} X^T y",
        "notes": "Adds penalty $\\lambda ||\\theta||_2^2$. Guarantees that $(X^T X + \\lambda I)$ is strictly positive definite and invertible."
      },
      {
        "name": "Binary Cross-Entropy Loss (Logistic Regression)",
        "formula": "J(\\theta) = -\\frac{1}{m} \\sum_{i=1}^m \\left[ y^{(i)} \\log(\\hat{y}^{(i)}) + (1 - y^{(i)}) \\log(1 - \\hat{y}^{(i)}) \\right]",
        "notes": "Convex loss function with sigmoid activation $\\sigma(z) = \\frac{1}{1 + e^{-z}}$; guaranteed global minimum via gradient descent."
      },
      {
        "name": "Decision Tree: Shannon Entropy & Gini Impurity",
        "formula": "H(S) = -\\sum_{i=1}^C p_i \\log_2(p_i), \\qquad \\text{Gini}(S) = 1 - \\sum_{i=1}^C p_i^2",
        "notes": "$\\text{Information Gain} = H(\\text{Parent}) - \\sum \\frac{|S_v|}{|S|} H(S_v)$. Lower entropy/Gini indicates higher node purity."
      },
      {
        "name": "Support Vector Machine (SVM) Margin",
        "formula": "\\text{Margin} = \\frac{2}{\\|w\\|_2}, \\qquad \\min_{w, b} \\frac{1}{2} \\|w\\|^2 \\quad \\text{s.t. } y_i(w^T x_i + b) \\ge 1",
        "notes": "Maximizing margin is equivalent to minimizing $\\frac{1}{2} \\|w\\|^2$. Soft margin uses slack variables $\\xi_i$ and penalty $C$."
      },
      {
        "name": "Classification Evaluation Metrics",
        "formula": "\\text{Precision} = \\frac{TP}{TP+FP}, \\quad \\text{Recall} = \\frac{TP}{TP+FN}, \\quad F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}",
        "notes": "Harmonic mean balances precision and recall, especially for imbalanced classification tasks."
      }
    ]
  },
  {
    "category": "DBMS & Indexing",
    "items": [
      {
        "name": "B+ Tree Internal Node Order & Capacity Formula",
        "formula": "p \\cdot P + (p - 1) \\cdot K \\le B",
        "notes": "$p$ = order (pointer count), $P$ = block pointer size (bytes), $K$ = search key size (bytes), $B$ = disk block size (bytes)."
      },
      {
        "name": "Lossless Join Decomposition Condition",
        "formula": "(R_1 \\cap R_2) \\to R_1 \\quad \\text{OR} \\quad (R_1 \\cap R_2) \\to R_2",
        "notes": "Common attribute(s) must form a superkey of at least one of the decomposed tables for the decomposition to be lossless."
      },
      {
        "name": "Relational Normal Forms Hierarchy",
        "formula": "\\text{1NF} \\supset \\text{2NF} \\supset \\text{3NF} \\supset \\text{BCNF}",
        "notes": "2NF: No partial dependency on candidate key. 3NF: No transitive dependency. BCNF: In every non-trivial FD $X \\to A$, $X$ must be a superkey."
      }
    ]
  }
];
var GATE_DA_FORMULAS = window.GATE_DA_FORMULAS;
if (typeof module !== "undefined") { module.exports = window.GATE_DA_FORMULAS; }
