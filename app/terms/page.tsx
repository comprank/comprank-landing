import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Conditions générales",
  description:
    "Consultez les conditions générales de vente et d’utilisation de la plateforme CompRank.",
  path: "/terms",
});

export default function Page() {
  return (
    <main id="contenu" className="mx-auto mt-16 max-w-3xl rounded-lg p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-primary-500">
        CONDITIONS GÉNÉRALES DE VENTE ET D&apos;UTILISATION
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          1. Dispositions générales
        </h2>
        <p className="mb-2">
          Les présentes conditions générales de vente déterminent les conditions
          dans lesquelles se déroulent les prestations de services fournies par
          la Société et établissent les obligations de chacune des parties
          concernant les Services proposés sur le Site.
        </p>
        <p>
          Les présentes conditions sont rédigées à la fois pour les Membres du
          Site de façon générale « Conditions applicables aux Membres » mais
          définissent également les obligations des Organisateurs, « Conditions
          applicables aux Organisateurs ».
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          2. Prestataire et prestations proposées
        </h2>
        <p className="mb-2">
          Les services sont proposés par la Société{" "}
          <span className="font-bold">SARL KIMAT</span>, domiciliée au 27 rue
          des Epinettes, 95240 Cormeilles en Parisis, immatriculée au RCS de
          Pontoise, au capital de 1000€, n° SIRET: 97952961700032. Le
          responsable légal est Nicolas LE BORGNE.
        </p>
        <p className="mb-2">
          La Société intervient dans le cadre des services proposés, comme
          simple intermédiaire entre les Membres et les Organisateurs.
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>
            L&apos;inscription sur le Site permet aux Membres de créer leurs
            événements. L&apos;Organisateur d&apos;évènements peut être
            professionnel ou non. La création se fait après la création
            d&apos;un compte membre, par le biais d&apos;un formulaire à
            remplir, tous les champs étant obligatoires.
          </li>
          <li>
            Le Site propose aux Membres organisateurs un affichage public des
            événements parmi ceux proposés sur le Site.
          </li>
          <li>
            La Société propose un service de billetterie aux Membres, leur
            permettant de s&apos;inscrire et de payer pour participer aux
            différents événements proposés par les Organisateurs.
          </li>
          <li>
            Il est également mis en place un système de scoring, permettant aux
            Membres et Organisateurs, de publier des résultats, d&apos;accéder à
            une comparaison de ces derniers selon les caractéristiques
            techniques prévues par le Site.
          </li>
        </ul>
        <p>
          Ces services sont proposés de manière globale par la Société : dès
          lors qu&apos;un événement est proposé par un Organisateur, ce dernier
          se doit d&apos;accepter et d&apos;utiliser de manière exclusive
          l&apos;ensemble des systèmes mis en œuvre.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          3. Obligations générales
        </h2>
        <p className="mb-2">
          Les présentes conditions de vente doivent être lues et acceptées à
          chaque nouvelle création d&apos;événements car elles peuvent faire
          l&apos;objet de modification, et ce à tout moment.
        </p>
        <p>
          Toute nouvelle création d&apos;événement ou participation à un
          événement vaut acceptation des présentes conditions par
          l&apos;Organisateur.
        </p>
      </section>

      <h2 className="text-2xl font-bold mb-4 text-primary-500">
        CONDITIONS RELATIVES AUX MEMBRES
      </h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          1. Prix, Modalités, Retards et Incidents de paiement
        </h3>
        <h4 className="font-semibold mb-1">1.1 Prix</h4>
        <p className="mb-2">
          Le prix est payé à l&apos;Organisateur lorsque le Membre décide de
          participer à un événement. Le prix est décidé de façon discrétionnaire
          par l&apos;Organisateur, et est exprimé de façon claire sur le Site.
        </p>
        <p className="mb-2">
          Sauf mention contraire, le prix indiqué l&apos;est toutes taxes
          comprises (TTC).
        </p>
        <h4 className="font-semibold mb-1">1.2 Modalités</h4>
        <p className="mb-2">
          Le paiement s&apos;effectue par le biais d&apos;un prestataire de
          paiement, le prestataire Stripe, et par le biais de prélèvement sur
          carte bancaire. Le paiement étant dévolu à un prestataire, le Site et
          la Société ne conservent aucune coordonnée bancaire des membres.
        </p>
        <p className="mb-2">
          Le Membre garantit à la Société et aux Organisateurs qu&apos;il
          dispose des autorisations nécessaires pour utiliser le mode de
          paiement choisi. Il s&apos;engage à prendre les mesures nécessaires
          afin que le prélèvement du prix des Services puisse être effectué.
        </p>
        <h4 className="font-semibold mb-1">
          1.3 Retards et Incidents de paiement
        </h4>
        <p>
          Le service de règlement et de paiement étant dévolu à un prestataire
          de paiement, tout retard ou incident de paiement devra être traité
          directement avec le prestataire désigné.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">2. Droit de rétractation</h3>
        <p>
          Conformément au code de la consommation française applicable, et
          notamment selon les articles L.121-20-4 et L.121-21-8, le droit de
          rétractation n&apos;est pas applicable aux services proposés.
        </p>
        <p>
          En effet, l&apos;inscription étant faite pour un événement déterminé,
          étant caractérisé comme un loisir, et fixé à une date ou selon une
          période précise, le Membre ne peut exercer son droit de rétractation.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">3. Dotations</h3>
        <p>
          Les dotations sont définies par avance, et mentionnées lors de
          l&apos;annonce de la compétition par chaque Organisateur. Ainsi, le
          Site et la Société ne sont pas responsables des dotations.
        </p>
        <p>
          Les dotations proposées, le sont directement par l&apos;Organisateur
          selon les partenariats dont il dispose. La délivrance des dotations
          s&apos;effectuera selon les termes prévus entre l&apos;Organisateur et
          son partenaire.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">4. Remboursement</h3>
        <p>
          Après inscription à un événement par un Membre, ce dernier ne pourra
          pas obtenir remboursement des sommes versées s&apos;il souhaite se
          rétracter et si le Site ou les services proposés ne sont pas en cause.
        </p>
        <p>
          En cas d&apos;annulation d&apos;un événement, le remboursement doit
          être effectué par l&apos;Organisateur de l&apos;évènement.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">5. Durée et Résiliation</h3>
        <p>
          Les présentes conditions générales de vente déterminent les conditions
          et obligations des parties pour chaque événement.
        </p>
        <p>
          Pour tout nouvel événement prévu, les Membres doivent se référer aux
          conditions générales de vente, se trouvant sur le site internet.
        </p>
        <p>
          Les conditions étant valables pour une durée déterminée, les parties
          ne peuvent résilier le contrat avant le terme prévu au contrat, même
          en cas d&apos;inexécution de l&apos;une des obligations.
        </p>
        <p>
          Toutefois, le contrat pourrait être résilié en cas d&apos;accord entre
          les parties, de force majeure, mais aussi en cas de faute grave de
          l&apos;une des parties.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          6. Garanties et Responsabilité
        </h3>
        <p>
          La Société s&apos;engage à respecter les obligations de moyens ou de
          résultat qui pèsent sur elle en tant que prestataire de service.
        </p>
        <p>
          Elle s&apos;engage notamment à respecter son obligation de moyen
          portant sur le service d&apos;affichage, de scoring,
          d&apos;inscription et de mise à disposition des services. Elle
          n&apos;est toutefois pas responsable du défaut d&apos;accès au site en
          cas de maintenance de ce dernier, mais aussi si cela est dû du propre
          fait du Membre.
        </p>
        <p>
          La Société a une obligation de moyen concernant la création
          d&apos;événements, chaque Organisateur crée et propose un événement,
          et la Société ne pourrait être tenue pour responsable du défaut
          d&apos;organisation d&apos;événements.
        </p>
        <p>
          Les Membres utilisant le site et les services reconnaissent avoir pris
          connaissance des conditions générales d&apos;utilisation du site, et
          de ce fait reconnaissent être tenus par ces conditions.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">7. Force majeure</h3>
        <p>
          Les parties ne pourront être tenues pour responsables de
          l&apos;inexécution de leurs obligations en cas de survenance d&apos;un
          cas de force majeure, étant défini comme tout événement imprévisible,
          irrésistible et extérieur, tendant à rendre impossible
          l&apos;exécution du contrat.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          8. Propriété Intellectuelle
        </h3>
        <p>
          Le Site et la Société sont propriétaires de droits de propriété
          intellectuelle ou détiennent des droits d&apos;usage sur tous les
          éléments accessibles sur le site, comme notamment les textes, images,
          graphismes, logo, icônes, sons, logiciels.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication,
          adaptation de tout ou partie des éléments du site, quel que soit le
          moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
          préalable de la Société.
        </p>
        <p>
          Toute exploitation non autorisée du site ou de l&apos;un quelconque
          des éléments qu&apos;il contient sera considérée comme constitutive
          d&apos;une contrefaçon et poursuivie conformément aux dispositions des
          articles L.335-3 et suivants du Code de Propriété Intellectuelle.
        </p>
        <p>
          En outre, les Organisateurs peuvent eux aussi être propriétaires de
          droit de propriété intellectuelle. Dès lors, toute utilisation
          d&apos;un droit protégé doit être autorisée, au risque d&apos;être
          qualifiée d&apos;acte contrefaisant.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          9. RGPD et respect des données personnelles
        </h3>
        <h4 className="font-semibold mb-1">
          9.1. Engagement de la Société dans le traitement des données
          personnelles
        </h4>
        <p>
          La Société, en tant que responsable du traitement des données
          personnelles de ses utilisateurs, s&apos;engage à respecter les
          dispositions du Règlement Général sur la Protection des Données (RGPD)
          et à assurer la confidentialité et la sécurité des données
          personnelles conformément à l&apos;article 5 du RGPD.
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>
            <span className="font-semibold">
              Collecte et finalités du traitement :
            </span>
            La Société collecte les données personnelles des utilisateurs de
            manière limitée aux informations nécessaires pour la fourniture de
            ses services. Les données personnelles seront traitées dans le but
            de faciliter les transactions, la communication entre les
            utilisateurs et la gestion des comptes utilisateurs.
          </li>
          <li>
            <span className="font-semibold">Base légale du traitement :</span>
            La Société recueille les données personnelles des membres afin de
            leur permettre de s&apos;inscrire aux évènements proposés par les
            Organisateurs.
          </li>
          <li>
            <span className="font-semibold">Durée de conservation :</span> Les
            données personnelles des utilisateurs seront conservées pendant 3
            ans afin de faciliter son accès et inscriptions rapide aux
            évènements proposés par les Organisateurs. Une fois ces finalités
            atteintes, les données personnelles seront effacées ou anonymisées,
            sauf si une obligation légale ou réglementaire impose leur
            conservation ultérieure.
          </li>
          <li>
            <span className="font-semibold">Sécurité des données :</span> La
            Société mettra en place des mesures techniques et organisationnelles
            appropriées pour assurer la sécurité des données personnelles des
            utilisateurs, afin de prévenir tout accès non autorisé, toute
            divulgation, toute altération ou toute destruction des données. Des
            évaluations régulières de l&apos;efficacité des mesures de sécurité
            seront effectuées.
          </li>
          <li>
            <span className="font-semibold">
              Transferts internationaux de données :
            </span>
            Si des transferts de données personnelles vers des pays situés en
            dehors de l&apos;Union européenne sont nécessaires, la Société
            s&apos;assurera que ces transferts sont effectués conformément aux
            dispositions du RGPD, en prenant les mesures appropriées pour
            garantir un niveau de protection adéquat des données personnelles.
          </li>
          <li>
            <span className="font-semibold">Droits des utilisateurs :</span> La
            Société respectera les droits des utilisateurs tels que le droit
            d&apos;accès, de rectification, d&apos;effacement, de limitation du
            traitement, de portabilité des données et d&apos;opposition au
            traitement de leurs données personnelles. Les utilisateurs pourront
            exercer leurs droits en contactant la Société, conformément aux
            procédures prévues par le RGPD.
          </li>
        </ul>
      </section>

      <h2 className="text-2xl font-bold mb-4 text-primary-500">
        CONDITIONS APPLICABLES AUX ORGANISATEURS
      </h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          1. Prix, Modalités, Réduction, Retards et Incidents de paiement
        </h3>
        <h4 className="font-semibold mb-1">1.1 Prix</h4>
        <p className="mb-2">
          Le prix de l&apos;inscription aux événements est fixé de manière
          discrétionnaire par chaque Organisateur et pour chaque évènement.
        </p>
        <p className="mb-2">
          L&apos;Organisateur choisit parmi une liste proposée la devise dans
          laquelle le prix est exprimé.
        </p>
        <p className="mb-2">
          Le prix doit être indiqué de façon claire pour chaque évènement.
        </p>
        <p className="mb-2">
          La Société se rémunère par le biais d&apos;une commission prélevée sur
          les frais d&apos;inscription payés par les Membres. Le montant de la
          commission est fixé par la Société et peut être modifié à tout moment.
        </p>
        <p className="mb-2">
          La rémunération du prestataire pouvant être modifiée par ce dernier,
          les Organisateurs doivent, pour chaque événement, prendre connaissance
          et accepter de nouveau les présentes conditions de vente, se
          matérialisant en une case à cocher lors de la création d&apos;un
          évènement.
        </p>
        <h4 className="font-semibold mb-1">1.2 Modalités</h4>
        <p className="mb-2">
          Le paiement du prix se fait par le biais d&apos;un prestataire de
          paiement, le prestataire Stripe. De ce fait, les Organisateurs
          acceptent les conditions d&apos;utilisation du prestataire.
        </p>
        <p className="mb-2">
          Tout Organisateur se doit de disposer ou de créer un compte auprès de
          notre prestataire au moment de l&apos;organisation d&apos;un
          événement.
        </p>
        <p className="mb-2">
          La non utilisation du service proposé ne permet pas l&apos;accès aux
          services pour l&apos;Organisateur.
        </p>
        <p className="mb-2">
          Tout paiement fait lors de l&apos;inscription à un événement doit être
          fait par le biais du Site internet. Les paiements concernés sont à la
          fois ceux des participants à la compétition, mais aussi ceux des
          visiteurs, spectateurs ou tout autre public intéressé.
        </p>
        <p className="mb-2">
          La rémunération du prestataire se fait automatiquement par prélèvement
          sur les paiements effectués.
        </p>
        <h4 className="font-semibold mb-1">1.3 Réductions consenties</h4>
        <p className="mb-2">
          Toute réduction est consentie librement par l&apos;Organisateur du
          fait que ce dernier fixe de manière libre les tarifs.
        </p>
        <h4 className="font-semibold mb-1">1.4 Taxes</h4>
        <p className="mb-2">
          Les prix exprimés doivent l&apos;être toutes taxes comprises.
        </p>
        <p className="mb-2">
          Les services étant à la fois destinés aux Organisateurs non
          professionnels et aux Organisateurs professionnels, les Organisateurs
          professionnels ont l&apos;obligation de récolter et de reverser
          eux-mêmes les taxes. Les Organisateurs non professionnels doivent eux
          procéder aux différentes déclarations nécessaires, et définies selon
          les règles applicables à chaque pays.
        </p>
        <p className="mb-2">
          La Société s&apos;engage à collecter et reverser les taxes
          nécessaires, comme la Taxe sur la Valeur Ajoutée (TVA)
          proportionnellement à la commission reçue.
        </p>
        <h4 className="font-semibold mb-1">
          1.5 Retards et Incidents de paiement
        </h4>
        <p className="mb-2">
          La rémunération de la Société par le biais de la commission prélevée
          est faite automatiquement dès lors qu&apos;un paiement est effectué
          sur le Site du prestataire de paiement.
        </p>
        <p className="mb-2">
          Toutefois, en cas de non respect ou inexécution des obligations
          relatives au paiement, comme le paiement par le biais d&apos;un autre
          prestataire que celui désigné, cela pourra entraîner des pénalités en
          cas de non conformité après mise en demeure.
        </p>
        <p>
          La pénalité appliquée correspondra au versement du double de la
          commission normalement due par mois de retard écoulé.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">2. Droit de rétractation</h3>
        <p>
          Conformément au code de la consommation française applicable, et
          notamment selon les articles L.121-20-4 et L.121-21-8, le droit de
          rétractation n&apos;est pas applicable aux services proposés.
        </p>
        <p>
          En effet, la création valant pour un événement déterminé, étant
          caractérisé comme un loisir, et fixé à une date ou selon une période
          précise, l&apos;Organisateur ne peut exercer son droit de
          rétractation.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">3. Dotations</h3>
        <p>
          Les dotations sont définies par avance, et mentionnées lors de
          l&apos;annonce de la compétition par chaque Organisateur. Ainsi, le
          Site et la Société ne sont pas responsables des dotations.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">4. Remboursement</h3>
        <p>
          Tout Organisateur, qui souhaite annuler un évènement doit rembourser
          les Membres inscrits à cet évènement. La Société ne peut en aucun cas
          prendre cette décision à la place de l&apos;Organisateur.
        </p>
        <p>
          En tant que simple intermédiaire, la Société, non dépositaire des
          fonds encaissés et non responsable de la décision d&apos;annulation de
          l&apos;évènement, y compris en cas de force majeure, n&apos;est pas
          responsable des sommes dues aux clients des vendeurs.
        </p>
        <p>
          En outre, lorsque des prestations de services proposées ont été
          exécutées par la Société, les commissions perçues ne sont pas
          remboursables.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">5. Durée et Résiliation</h3>
        <p>
          Les présentes conditions de ventes sont valables entre le Site et
          l&apos;Organisateur pour un événement déterminé. Pour chaque
          événement, l&apos;Organisateur se doit d&apos;accepter de nouveau les
          conditions.
        </p>
        <p>
          Ainsi, un contrat à durée déterminée est conclu entre le Site et
          l&apos;Organisateur. Aucun droit de résiliation unilatéral n&apos;est
          accordé aux parties même en cas d&apos;inexécution des obligations ;
          sauf cas d&apos;accord entre les parties, force majeure ou faute grave
          de l&apos;une des parties, le contrat prenant fin à la date prévue
          initialement.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          6. Garanties et Responsabilité
        </h3>
        <h4 className="font-semibold mb-1">6.1 Obligations de la société</h4>
        <p>
          La Société détient une obligation de moyen vis-à-vis des Organisateurs
          concernant les services d&apos;affichage et de scoring. Ainsi, la
          Société garantit aux Organisateurs la mise en œuvre de tous les moyens
          possibles afin de remplir cette obligation.
        </p>
        <h4 className="font-semibold mb-1">
          6.2 Obligations de l&apos;organisateur
        </h4>
        <p>
          L&apos;Organisateur garantit avoir pris connaissance des Conditions
          Générales d&apos;Utilisation présentes sur le site.
        </p>
        <p>
          L&apos;Organisateur a pour obligation de reverser une commission à la
          Société correspondant à sa rémunération, commission prélevée sur
          chaque inscription à un événement par l&apos;intermédiaire du système
          de paiement disponible sur la plateforme ou payée par virement
          bancaire sur présentation d&apos;une facture de la société.
        </p>
        <h4 className="font-semibold mb-1">
          6.3 Engagement de conformité au RGPD et responsabilité de
          l&apos;organisateur
        </h4>
        <ul className="list-disc pl-6 mb-2">
          <li>
            <span className="font-semibold">
              Responsabilité de l&apos;organisateur :
            </span>
            Chaque organisateur est responsable du respect des obligations du
            RGPD concernant la collecte, le traitement et l&apos;utilisation des
            données personnelles des utilisateurs. La Société ne peut être tenue
            pour responsable des violations de la protection des données
            commises par les vendeurs.
          </li>
          <li>
            <span className="font-semibold">
              Engagement de conformité RGPD :
            </span>
            Chaque organisateur s&apos;engage explicitement à respecter les
            dispositions du RGPD dans le cadre de leurs activités sur la
            Société. L&apos;organisateur atteste qu&apos;il collectera, traitera
            et utilisera les données personnelles des utilisateurs en conformité
            avec les principes du RGPD.
          </li>
          <li>
            <span className="font-semibold">
              Consentement des utilisateurs :
            </span>
            Les organisateurs doivent obtenir le consentement des utilisateurs
            avant de collecter, traiter ou utiliser leurs données personnelles.
            Les organisateurs doivent mettre en place des mécanismes appropriés
            pour recueillir le consentement de manière conforme aux exigences du
            RGPD.
          </li>
          <li>
            <span className="font-semibold">
              Obligation d&apos;information :
            </span>
            Les organisateurs doivent fournir aux utilisateurs les informations
            requises par le RGPD concernant le traitement de leurs données
            personnelles. Cela inclut les finalités du traitement, les
            destinataires des données, la durée de conservation, les droits des
            utilisateurs, etc.
          </li>
          <li>
            <span className="font-semibold">Sécurité des données :</span> Les
            organisateurs doivent mettre en place des mesures de sécurité
            appropriées pour protéger les données personnelles des utilisateurs
            contre tout accès, divulgation ou utilisation non autorisés. La
            Société n&apos;est pas responsable des violations de sécurité qui
            pourraient survenir chez les organisateurs.
          </li>
          <li>
            <span className="font-semibold">Sous-traitance :</span> Si les
            organisateurs font appel à des sous-traitants pour le traitement des
            données personnelles, ils doivent s&apos;assurer que ces
            sous-traitants offrent des garanties suffisantes en matière de
            protection des données et respectent également les obligations du
            RGPD.
          </li>
          <li>
            <span className="font-semibold">
              Notification des violations de données :
            </span>
            Les organisateurs doivent notifier immédiatement à la Société toute
            violation de données pouvant affecter les utilisateurs. La Société
            collaborera avec l&apos;organisateur pour prendre les mesures
            nécessaires conformément aux exigences du RGPD.
          </li>
          <li>
            <span className="font-semibold">Confidentialité :</span> Les
            informations sensibles échangées entre la Société et les
            organisateurs dans le cadre de leurs activités sont soumises à une
            stricte clause de confidentialité pour protéger leur
            confidentialité.
          </li>
          <li>
            <span className="font-semibold">Indemnisation :</span> Les
            organisateurs doivent indemniser la Société et la tenir à
            l&apos;abri de toute réclamation, perte ou responsabilité résultant
            de leur non-respect des obligations du RGPD.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">7. Force majeure</h3>
        <p>
          Les parties ne pourront être tenues pour responsables de
          l&apos;inexécution de leurs obligations en cas de survenance d&apos;un
          cas de force majeure, étant défini comme tout événement imprévisible,
          irrésistible et extérieur, tendant à rendre impossible
          l&apos;exécution du contrat.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          8. Propriété Intellectuelle
        </h3>
        <p>
          Le Site et la Société sont propriétaires de droits de propriété
          intellectuelle ou détiennent des droits d&apos;usage sur tous les
          éléments accessibles sur le site, comme notamment les textes, images,
          graphismes, logo, icônes, sons, logiciels.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication,
          adaptation de tout ou partie des éléments du site, quel que soit le
          moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
          préalable de la Société.
        </p>
        <p>
          Toute exploitation non autorisée du site ou de l&apos;un quelconque
          des éléments qu&apos;il contient sera considérée comme constitutive
          d&apos;une contrefaçon et poursuivie conformément aux dispositions des
          articles L.335-3 et suivants du Code de Propriété Intellectuelle.
        </p>
        <p>
          Concernant le Contenu publié sur le site, l&apos;Organisateur accepte
          que ce dernier puisse être repris à des fins publicitaires et de
          communication. En aucun cas la Société ne saurait demander une
          rémunération pour ces publicités ou communications.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          9. Droit applicable et Litiges
        </h3>
        <p>Les présentes conditions sont régies par la loi française.</p>
        <p>
          Tout litige lié à l&apos;interprétation et/ou à l&apos;exécution des
          présentes conditions doit, en premier lieu, et dans la mesure du
          possible, être réglé au moyen de négociations amiables. À défaut
          d&apos;accord amiable, tout différend est porté devant les tribunaux
          français compétents.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          10. Suppression de compte (spécificité CompRank)
        </h3>
        <p>
          Les utilisateurs peuvent demander la suppression de leur compte et de
          leurs données à tout moment en contactant :
          <a
            href="mailto:contact@comprank.fr"
            className="text-blue-600 underline"
          >
            contact@comprank.fr
          </a>
          .
        </p>
        <p>
          La Société se réserve le droit de supprimer tout compte ne respectant
          pas les présentes conditions.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">11. Relation Clients</h3>
        <p>
          Pour toute information complémentaire, question ou réclamation,
          veuillez contacter la Société, en français ou en anglais :
        </p>
        <ul className="list-disc pl-6">
          <li>
            par voie électronique à l&apos;adresse mail suivante :
            <a
              href="mailto:contact@comprank.fr"
              className="text-blue-600 underline"
            >
              contact@comprank.fr
            </a>
          </li>
          <li>
            par voie postale à l&apos;adresse suivante : 27 rue des Epinettes,
            95240 Cormeilles en Parisis
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">12. Entrée en vigueur</h3>
        <p>Les présentes CGV sont entrées en vigueur le 1 Janvier 2025.</p>
      </section>

      <h2 className="text-2xl font-bold mb-4 text-primary-500">ANNEXE</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Code de la consommation</h3>
        <p className="mb-2">
          <span className="font-semibold">Article L121-20-4</span>
          <br />
          Les dispositions des articles L.121-18; L.121-19; L.121-20 et
          L.121-20-1 ne sont pas applicables aux contrats ayant pour objet :
        </p>
        <ul className="list-decimal pl-8 mb-2">
          <li>
            La fourniture de biens de consommation courante réalisée au lieu
            d&apos;habitation ou de travail du consommateur par des
            distributeurs faisant des tournées fréquentes et régulières ;
          </li>
          <li>
            La prestation de services d&apos;hébergement, de transport, de
            restauration, de loisirs qui doivent être fournis à une date ou
            selon une périodicité déterminée.
          </li>
        </ul>
        <p>
          Les dispositions des articles L. 121-18 et L. 121-19 sont toutefois
          applicables aux contrats conclus par voie électronique lorsqu&apos;ils
          ont pour objet la prestation des services mentionnés au 2°.
        </p>
        <p className="mt-4">
          <span className="font-semibold">Article L.121-21-8</span>
          <br />
          Le droit de rétractation ne peut être exercé pour les contrats :
        </p>
        <ul className="list-decimal pl-8">
          <li>
            De fourniture de services pleinement exécutés avant la fin du délai
            de rétractation et dont l&apos;exécution a commencé après accord
            préalable exprès du consommateur et renoncement exprès à son droit
            de rétractation ;
          </li>
          <li>
            De fourniture de biens ou de services dont le prix dépend de
            fluctuations sur le marché financier échappant au contrôle du
            professionnel et susceptibles de se produire pendant le délai de
            rétractation ;
          </li>
          <li>
            De fourniture de biens confectionnés selon les spécifications du
            consommateur ou nettement personnalisés ;
          </li>
          <li>
            De fourniture de biens susceptibles de se détériorer ou de se
            périmer rapidement ;
          </li>
          <li>
            De fourniture de biens qui ont été descellés par le consommateur
            après la livraison et qui ne peuvent être renvoyés pour des raisons
            d&apos;hygiène ou de protection de la santé ;
          </li>
          <li>
            De fourniture de biens qui, après avoir été livrés et de par leur
            nature, sont mélangés de manière indissociable avec d&apos;autres
            articles ;
          </li>
          <li>
            De fourniture de boissons alcoolisées dont la livraison est différée
            au-delà de trente jours et dont la valeur convenue à la conclusion
            du contrat dépend de fluctuations sur le marché échappant au
            contrôle du professionnel ;
          </li>
          <li>
            De travaux d&apos;entretien ou de réparation à réaliser en urgence
            au domicile du consommateur et expressément sollicités par lui, dans
            la limite des pièces de rechange et travaux strictement nécessaires
            pour répondre à l&apos;urgence ;
          </li>
          <li>
            De fourniture d&apos;enregistrements audio ou vidéo ou de logiciels
            informatiques lorsqu&apos;ils ont été descellés par le consommateur
            après la livraison ;
          </li>
          <li>
            De fourniture d&apos;un journal, d&apos;un périodique ou d&apos;un
            magazine, sauf pour les contrats d&apos;abonnement à ces
            publications ;
          </li>
          <li>Conclu lors d&apos;une enchère publique ;</li>
          <li>
            De prestations de services d&apos;hébergement, autres que
            d&apos;hébergement résidentiel, de services de transport de biens,
            de locations de voitures, de restauration ou d&apos;activités de
            loisirs qui doivent être fournis à une date ou à une période
            déterminée ;
          </li>
          <li>
            De fourniture d&apos;un contenu numérique non fourni sur un support
            matériel dont l&apos;exécution a commencé après accord préalable
            exprès du consommateur et renoncement exprès à son droit de
            rétractation.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          Code de la Propriété Intellectuelle
        </h3>
        <p>
          <span className="font-semibold">Article L. 335-3</span>
          <br />
          Est également un délit de contrefaçon toute reproduction,
          représentation ou diffusion, par quelque moyen que ce soit, d&apos;une
          œuvre de l&apos;esprit en violation des droits de l&apos;auteur, tels
          qu&apos;ils sont définis et réglementés par la loi.
          <br />
          Est également un délit de contrefaçon la violation de l&apos;un des
          droits de l&apos;auteur d&apos;un logiciel définis à l&apos;article
          L.122-6.
          <br />
          Est également un délit de contrefaçon toute captation totale ou
          partielle d&apos;une œuvre cinématographique ou audiovisuelle en salle
          de spectacle cinématographique.
        </p>
      </section>
    </main>
  );
}
