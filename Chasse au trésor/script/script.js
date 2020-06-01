//initialisation des variables
let coordonneeX = Math.floor(Math.random() * 8);
let coordonneeY = Math.floor(Math.random() * 8);                        //Coords de l'argent
var idTresor = String(coordonneeX) + '-' + String(coordonneeY);         //id de l'argent
let compteur = 0;                                                       
let monTableau = Tableau2D(8, 8);                                       
let tableau = "<table id='fondtable'>";
let commentaire = "</mark><strong>Zoro</strong> n'a pas de sens de l'orientation, veuillez le guider x)</mark>";                   

//fonction qui renvoit le tableau en 2D
function Tableau2D(x, y) {
    var array2D = new Array(x);
    for (var i = 0; i < array2D.length; i++) {
        array2D[i] = new Array(y);
    }
    return array2D;
}

//Création d'un ennemi sur le chemin : Foxy est son redoutable équipage
let coordonneeXFoxy1 = 0;
let coordonneeYFoxy1 = 0;
do {
    coordonneeXFoxy1 = Math.floor(Math.random() * 8);
    coordonneeYFoxy1 = Math.floor(Math.random() * 8); 
} while (coordonneeXFoxy1 == coordonneeX && coordonneeYFoxy1 == coordonneeY);
let idFox1 = String(coordonneeXFoxy1) + '-' + String(coordonneeYFoxy1);

//fonction qui vérifie que la page soit complètement chargée avant de lancer la fonction initTab
window.onload = function() { initTab(); }

//fonction qui créer le tableau et place le trésor
function initTab() {
    monTableau[coordonneeX][coordonneeY] = "";
    //console.log("id tresor : " + idTresor);

    for (y = 0; y < monTableau.length; y++){
        tableau = tableau + "<tr>";
            for (i = 0; i < monTableau.length; i++){
                if (monTableau[y][i] != monTableau[coordonneeX][coordonneeY]){
                    monTableau[y][i] = " ";
                }
                tableau = tableau + "<td id=" + String(y) + "-" + String(i) + " onclick='choix(this.id)'; >" + monTableau[y][i] + "</td>";  //definir les id de chaques cases du tableau
            }
        tableau = tableau + "</tr>";
    }
    tableau = tableau + "</tr></table>"
    document.getElementById("emplacementTable").innerHTML = tableau;
}

//fonction qui récupère l'ID de la case cliquée et traite le résultat
function choix(id){
    caseTable = document.getElementById(id);
    //si clique sur le trésor
    if (id == idTresor){
        
        caseTable.setAttribute('class', 'good');        //changement de couleur
        console.log("Gagné");

        for (y = 0; y < monTableau.length; y++){
            for (i = 0; i < monTableau.length; i++){
                let caseId = y + "-" + i;
                document.getElementById(caseId).setAttribute('onclick', '');        //boucle qui permet de bloquer toutes les cases apres avoir trouvé le trésor
            }        
        }
        compteur++;
        afficherCompteur(compteur);
        afficherVictoire(); 
    
    //si l'on atterris sur la bonne ligne
    } else if (id == coordonneeX + "-0" || id == coordonneeX + "-1" || id == coordonneeX + "-2" || id == coordonneeX + "-3" || id == coordonneeX + "-4" || id == coordonneeX + "-5" || id == coordonneeX + "-6" || id == coordonneeX + "-7"){
        
        caseTable.setAttribute('class', 'goodline');       //changement de couleur
        caseTable.setAttribute('onclick', '');          //désactivation du onclick de la case
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("<strong>Nami:</strong> Vous êtes sur la bonne ligne !<br />");

    //s'il s'agit de la bonne colonne
    } else if (id == "0-" + coordonneeY || id == "1-" + coordonneeY || id == "2-" + coordonneeY || id == "3-" + coordonneeY || id == "4-" + coordonneeY || id == "5-" + coordonneeY || id == "6-" + coordonneeY || id == "7-" + coordonneeY){

        caseTable.setAttribute('class', 'column');     
        caseTable.setAttribute('onclick', '');
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("<strong>Nami:</strong> Zoro bouge surtout pas t'es sur la bonne colonne !<br />");

    //Lorsque l'on croise le chemin de Foxy
    } else if (id == idFox1){

        caseTable.setAttribute('class', 'Fox');    
        caseTable.setAttribute('onclick', '');          
        compteur = compteur + 3;
        afficherCompteur(compteur);
        afficherCommentaire("</br><strong>Luffy:</strong> On vient de tomber sur Foxy et son équipage ! Mince ça va être plus dur que prévu... Vous devez le battre et perdez quelques jours !<br /></br>")

    //si on clique sur une mauvaise case
    } else {


        caseTable.setAttribute('class', 'bad');
        caseTable.setAttribute('onclick', '');   
        compteur++;
        afficherCompteur(compteur);
        afficherCommentaire("<strong>Zoro:</strong> Et mince... Il est toujours pas là, je suis où moi ?! <br />");
    }
}

//affichage des commentaires
function afficherCommentaire(message){

    commentaire = message + commentaire;

    document.getElementById("emplacementCommentaires").innerHTML = commentaire;
}

//affichage du compteur
function afficherCompteur(valeur){
    document.getElementById("compte").innerHTML = valeur;
}

//Fin du jeu + Bouton Play Again
function afficherVictoire(){
    message = "<br /><strong>C'est parfait, grâce à ça je vais sauver l'équipage ils vont être content. D'ailleurs il faut que je me dépêche j'ai mis combien de temps ?! " + compteur + " jours !</strong><br /><br /> <button onclick='window.location.reload(false)'> Rejouer </button>"
    document.getElementById("emplacementCommentaires").innerHTML = message;
}