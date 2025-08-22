/**
 * Sample data for the educational app
 * In a real app, this would come from a backend API
 */

// Class levels available in the app
export const CLASS_LEVELS = {
  FIRST_YEAR: "1ère année",
  SECOND_YEAR: "2ème année",
  THIRD_YEAR: "3ème année",
  BAC: "Bac",
};

// Sample users data
export const SAMPLE_USERS = [
  {
    id: "1",
    email: "admin@school.com",
    password: "admin123",
    name: "Mr. Naim",
    role: "admin",
  },
  {
    id: "2",
    email: "student1@school.com",
    password: "student123",
    name: "Ahmed Khalil",
    role: "student",
    classLevel: CLASS_LEVELS.FIRST_YEAR,
  },
  {
    id: "3",
    email: "student2@school.com",
    password: "student123",
    name: "Fatima Ben Ali",
    role: "student",
    classLevel: CLASS_LEVELS.SECOND_YEAR,
  },
];

// Sample activities/series data
export const SAMPLE_ACTIVITIES = [
  {
    id: "1",
    title: "Série 1: Les fonctions",
    subject: "Mathématiques",
    classLevel: CLASS_LEVELS.FIRST_YEAR,
    description: "Introduction aux fonctions mathématiques",
    htmlContent: `
      <h2>Série 1: Les fonctions</h2>
      <p><strong>Objectif:</strong> Comprendre les bases des fonctions mathématiques</p>
      
      <h3>Exercice 1:</h3>
      <p>Soit f(x) = 2x + 3</p>
      <ol>
        <li>Calculer f(0)</li>
        <li>Calculer f(5)</li>
        <li>Résoudre f(x) = 7</li>
      </ol>
      
      <h3>Exercice 2:</h3>
      <p>Tracer le graphique de la fonction g(x) = x²</p>
      
      <div style="background-color: #f0f0f0; padding: 10px; margin: 10px 0;">
        <strong>Note:</strong> Utilisez un tableau de valeurs pour x ∈ [-3, 3]
      </div>
    `,
    correction: `
      <h2>Correction - Série 1: Les fonctions</h2>
      
      <h3>Exercice 1:</h3>
      <ol>
        <li><strong>f(0) =</strong> 2(0) + 3 = 3</li>
        <li><strong>f(5) =</strong> 2(5) + 3 = 13</li>
        <li><strong>f(x) = 7:</strong> 2x + 3 = 7 → 2x = 4 → x = 2</li>
      </ol>
      
      <h3>Exercice 2:</h3>
      <p><strong>Tableau de valeurs pour g(x) = x²:</strong></p>
      <table border="1" style="border-collapse: collapse; margin: 10px 0;">
        <tr><th>x</th><th>-3</th><th>-2</th><th>-1</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
        <tr><th>g(x)</th><td>9</td><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td><td>9</td></tr>
      </table>
      <p>Le graphique est une parabole avec sommet en (0,0) ouverte vers le haut.</p>
    `,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Série 2: Équations du second degré",
    subject: "Mathématiques",
    classLevel: CLASS_LEVELS.SECOND_YEAR,
    description: "Résolution des équations quadratiques",
    htmlContent: `
      <h2>Série 2: Équations du second degré</h2>
      <p><strong>Rappel:</strong> Une équation du second degré a la forme ax² + bx + c = 0</p>
      
      <h3>Formule du discriminant:</h3>
      <p>Δ = b² - 4ac</p>
      
      <h3>Exercice 1:</h3>
      <p>Résoudre: x² - 5x + 6 = 0</p>
      
      <h3>Exercice 2:</h3>
      <p>Résoudre: 2x² + 3x - 2 = 0</p>
      
      <div style="background-color: #e6f3ff; padding: 10px; margin: 10px 0;">
        <strong>Méthode:</strong> Utiliser la formule x = (-b ± √Δ) / 2a
      </div>
    `,
    correction: `
      <h2>Correction - Série 2: Équations du second degré</h2>
      
      <h3>Exercice 1: x² - 5x + 6 = 0</h3>
      <p>a = 1, b = -5, c = 6</p>
      <p>Δ = (-5)² - 4(1)(6) = 25 - 24 = 1</p>
      <p>x₁ = (5 + 1)/2 = 3</p>
      <p>x₂ = (5 - 1)/2 = 2</p>
      <p><strong>Solutions:</strong> x = 2 ou x = 3</p>
      
      <h3>Exercice 2: 2x² + 3x - 2 = 0</h3>
      <p>a = 2, b = 3, c = -2</p>
      <p>Δ = 3² - 4(2)(-2) = 9 + 16 = 25</p>
      <p>x₁ = (-3 + 5)/4 = 1/2</p>
      <p>x₂ = (-3 - 5)/4 = -2</p>
      <p><strong>Solutions:</strong> x = 1/2 ou x = -2</p>
    `,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    title: "Série 1: La révolution française",
    subject: "Histoire",
    classLevel: CLASS_LEVELS.THIRD_YEAR,
    description: "Étude de la révolution française de 1789",
    htmlContent: `
      <h2>Série 1: La révolution française (1789-1799)</h2>
      
      <h3>I. Les causes de la révolution</h3>
      <ul>
        <li><strong>Causes économiques:</strong> Crise financière, déficit budgétaire</li>
        <li><strong>Causes sociales:</strong> Inégalités entre les ordres</li>
        <li><strong>Causes politiques:</strong> Absolutisme royal</li>
      </ul>
      
      <h3>II. Questions</h3>
      <ol>
        <li>Quelles sont les trois causes principales de la révolution française ?</li>
        <li>Qu'est-ce que les États généraux ?</li>
        <li>Que s'est-il passé le 14 juillet 1789 ?</li>
      </ol>
      
      <div style="background-color: #fff3cd; padding: 10px; margin: 10px 0;">
        <strong>À retenir:</strong> La révolution marque la fin de l'Ancien Régime
      </div>
    `,
    correction: `
      <h2>Correction - Série 1: La révolution française</h2>
      
      <h3>Réponses:</h3>
      <ol>
        <li><strong>Les trois causes principales:</strong>
          <ul>
            <li>Crise économique et financière</li>
            <li>Inégalités sociales (privilèges)</li>
            <li>Crise politique (absolutisme)</li>
          </ul>
        </li>
        <li><strong>Les États généraux:</strong> Assemblée réunissant les représentants des trois ordres (noblesse, clergé, tiers état)</li>
        <li><strong>14 juillet 1789:</strong> Prise de la Bastille par le peuple parisien, symbole du début de la révolution</li>
      </ol>
    `,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    title: "Série Bac: Analyse littéraire",
    subject: "Français",
    classLevel: CLASS_LEVELS.BAC,
    description: "Préparation à l'épreuve de français du bac",
    htmlContent: `
      <h2>Série Bac: Analyse littéraire</h2>
      <p><strong>Texte:</strong> Extrait des "Fleurs du Mal" de Baudelaire</p>
      
      <blockquote style="font-style: italic; margin: 20px; padding: 10px; border-left: 3px solid #ccc;">
        "La très-chère était nue, et, connaissant mon cœur,<br>
        Elle n'avait gardé que ses bijoux sonores,<br>
        Dont le riche attirail lui donnait l'air vainqueur<br>
        Qu'ont dans leurs jours heureux les esclaves des Mores."
      </blockquote>
      
      <h3>Questions d'analyse:</h3>
      <ol>
        <li>Analysez la métaphore des "bijoux sonores"</li>
        <li>Comment le poète présente-t-il la femme dans ce passage ?</li>
        <li>Relevez et commentez une comparaison dans le texte</li>
      </ol>
      
      <div style="background-color: #f8f9fa; padding: 10px; margin: 10px 0;">
        <strong>Méthode:</strong> Analysez les figures de style et le registre du texte
      </div>
    `,
    correction: `
      <h2>Correction - Série Bac: Analyse littéraire</h2>
      
      <ol>
        <li><strong>Métaphore des "bijoux sonores":</strong> 
          <p>Cette métaphore évoque la musicalité et la sensualité. Les bijoux produisent des sons qui accompagnent les mouvements de la femme, créant une symphonie érotique.</p>
        </li>
        
        <li><strong>Présentation de la femme:</strong>
          <p>La femme est présentée comme un objet de désir et d'art. Elle est "nue" mais parée, créant un contraste entre naturel et artificiel. Le terme "très-chère" montre l'affection et la valeur accordée.</p>
        </li>
        
        <li><strong>Comparaison:</strong>
          <p>"Qu'ont dans leurs jours heureux les esclaves des Mores" - Cette comparaison évoque l'exotisme et le luxe oriental, référence aux harems. Elle souligne la beauté triomphante et l'aspect conquérant de la femme.</p>
        </li>
      </ol>
    `,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
];

// Function to get activities by class level
export const getActivitiesByClass = (classLevel) => {
  return SAMPLE_ACTIVITIES.filter(
    (activity) => activity.classLevel === classLevel
  );
};

// Function to authenticate user
export const authenticateUser = (email, password) => {
  return SAMPLE_USERS.find(
    (user) => user.email === email && user.password === password
  );
};
