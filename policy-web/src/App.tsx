import Header from "./Header";
import Text from "./Text";
import { Li, Ul } from "./Lists";
import { Link } from "./Text";
import { Button } from "./components/ui/button";
import { sendAnalytics, sendQuestionaryResponse } from "./Analytics";
import { ReactNode, useEffect } from "react";
import BackgroundWave from "./BackgroundWave";

export default function App() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/goodbye":
      return (
        <Layout>
          <GoodbyePage />
        </Layout>
      );
    case "/onboarding":
      return (
        <Layout>
          <OnboardingPage />
        </Layout>
      );
    default:
      return (
        <Layout>
          <IndexPage />
        </Layout>
      );
  }
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0a0a14', // Dark background
        zIndex: -2
      }} />
      <BackgroundWave />
      <main
        className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 text-white"
      >
        <div className="w-full max-w-2xl bg-black/30 p-8 rounded-xl backdrop-blur-sm shadow-xl">
          {children}
        </div>
      </main>
    </div>
  );
}

function GoodbyePage() {
  useEffect(() => {
    const userID = new URLSearchParams(window.location.search).get("userid");
    if (userID) {
      sendAnalytics("uninstall", undefined, userID);
    }
  }, []);

  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="mb-12 mt-28">
          <img
            src="/icon.png"
            alt="Extension Logo (On)"
            width={128}
            height={128}
            className="w-30% h-30% max-w-[200px] animation-breathe"
          />
        </div>
        <Header variant="h1">Are you sure? We'd hate to see you leave.</Header>
        <div className="mt-12 mb-6">
          <Header variant="h3">What is the reason for uninstalling?</Header>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            className="w-full sm:w-auto"
            onClick={(e) => {
              const userID = new URLSearchParams(window.location.search).get(
                "userid"
              );
              sendQuestionaryResponse(
                userID || "",
                "Reason for Leaving",
                "Not Useful",
                "uninstall"
              );
              disableButtons(e);
            }}
          >
            Not Useful
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={(e) => {
              const userID = new URLSearchParams(window.location.search).get(
                "userid"
              );
              sendQuestionaryResponse(
                userID || "",
                "Reason for Leaving",
                "Found a Better Extension",
                "uninstall"
              );
              disableButtons(e);
            }}
          >
            Found alternative
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={(e) => {
              const userID = new URLSearchParams(window.location.search).get(
                "userid"
              );
              sendQuestionaryResponse(
                userID || "",
                "Reason for Leaving",
                "Privacy Concerns",
                "uninstall"
              );
              disableButtons(e);
            }}
          >
            Privacy Concerns
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={(e) => {
              const userID = new URLSearchParams(window.location.search).get(
                "userid"
              );
              sendQuestionaryResponse(
                userID || "",
                "Reason for Leaving",
                "Too Many Bugs",
                "uninstall"
              );
              disableButtons(e);
            }}
          >
            Buggy
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={(e) => {
              const userID = new URLSearchParams(window.location.search).get(
                "userid"
              );
              sendQuestionaryResponse(
                userID || "",
                "Reason for Leaving",
                "Other",
                "uninstall"
              );
              disableButtons(e);
            }}
          >
            Other
          </Button>
        </div>
        <div className="mt-14"></div>
        <Header variant="h3">
          Please provide your feedback on the extension
        </Header>
        <textarea
          className="w-full p-4 border rounded-md mt-4"
          placeholder="Please let us know your thoughts..."
          rows={5}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Button
            className="w-full"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const feedback = document.querySelector<HTMLTextAreaElement>("textarea")?.value;
              const userID = new URLSearchParams(window.location.search).get(
                "userid"
              );
              if (feedback) {
                sendQuestionaryResponse(
                  userID || "",
                  "Typed Feedback",
                  feedback,
                  "uninstall"
                );
                const button = e.target as HTMLButtonElement;
                if (button) {
                  button.disabled = true;
                  button.textContent = "Feedback Submitted";
                }
                alert("Thank you for your feedback!");
                window.location.href = "https://www.google.com";
              } else {
                alert("Please provide your feedback before continuing.");
              }
            }}
          >
            Continue
          </Button>
          <Button className="w-full ">
            <a href="https://chromewebstore.google.com/detail/less/kcgblchgejkpnemehaojecgbamdiacml">
              Reinstall
            </a>
          </Button>
        </div>
        <div className="mt-8 absolute bottom-10"></div>
      </div>
    </div>
  );
}

function OnboardingPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="mb-12 mt-28">
          <img
            src="/icon.png"
            alt="Extension Logo (On)"
            width={128}
            height={128}
            className="w-30% h-30% max-w-[200px] animation-breathe"
          />
        </div>
        <Header variant="h1">Thank you for downloading Less!</Header>
        <Text className="mt-12 mb-4">You are now that much closer to,</Text>
        <div className="flex flex-wrap justify-center gap-8">
          <Text>Sustainable Consumption ✅</Text>
          <Text>Financial Freedom ✅</Text>
          <Text>Reducing Impulsive Purchasing ✅</Text>
        </div>
        <div className="mt-8 absolute bottom-10">
          <a href="/">
            <Header variant="h3">PRIVACY POLICY</Header>
          </a>
        </div>
      </div>
    </div>
  );
}

function IndexPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8">
        <blockquote className="text-primary text-xl italic my-16">
          “One who is patient glows with an inner radiance.” - Allan Lokos
        </blockquote>
        {/* Logo Section */}
        <div className="mb-12 text-center">
          <img
            src="/icon.png"
            alt="Extension Logo (On)"
            width={128}
            height={128}
            className="w-full h-full max-w-[200px] animation-breathe"
          />
        </div>
        {/* Inspirational message */}
        <div className="w-full mb-6">
          <Text className="text-center text-sm text-muted-foreground mt-2">
            Take a breath and think before you buy
          </Text>
        </div>
        {/* Toggle Button */}
        <Button
          className={"w-1/2 mb-4"}
          onClick={() => {
            window.location.href =
              "https://chromewebstore.google.com/detail/less/kcgblchgejkpnemehaojecgbamdiacml";
          }}
        >
          Visit the Extension Page
        </Button>
      </div>
      {/* First Text Block */}

      <Header variant="h1">Research Description</Header>
      <Text>
        Welcome to Less, a browser extension designed to help reduce impulsive
        online purchases. Our global consumption levels have grown to an
        unsustainable scale, posing a serious threat to the planet’s
        environment. By encouraging mindful purchasing decisions, Less aims to
        promote a more eco-friendly lifestyle, help you save money, and offer
        the mental benefits of decluttering. Developed as part of a thesis on
        reducing online impulsive buying behaviors, this tool is meant to
        support both your financial well-being and the environment.
      </Text>

      <Header variant="h2">Supported Shopping Sites</Header>
      <Text>
        <div className="mb-4">
          The extension currently supports over 200 shopping sites. Use the search box below to check if your favorite site is supported:
        </div>
        <div className="my-4">
          <input 
            type="text" 
            placeholder="Search for a website..." 
            className="w-full p-2 border rounded-md bg-black/40 text-white"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              const websiteList = document.getElementById('website-list');
              if (!websiteList) return;
              
              const items = websiteList.getElementsByTagName('li');
              for (let i = 0; i < items.length; i++) {
                const website = items[i].textContent?.toLowerCase() || '';
                if (website.includes(value)) {
                  items[i].style.display = '';
                } else {
                  items[i].style.display = 'none';
                }
              }
              
              // Show/hide region headers based on visible children
              const regions = websiteList.getElementsByClassName('region-header');
              for (let i = 0; i < regions.length; i++) {
                const region = regions[i] as HTMLElement;
                const nextSibling = region.nextElementSibling;
                if (nextSibling && nextSibling.tagName === 'UL') {
                  const items = nextSibling.getElementsByTagName('li');
                  let hasVisibleItems = false;
                  
                  for (let j = 0; j < items.length; j++) {
                    if (items[j].style.display !== 'none') {
                      hasVisibleItems = true;
                      break;
                    }
                  }
                  
                  region.style.display = hasVisibleItems ? '' : 'none';
                }
              }
            }}
          />
        </div>
        <div id="website-list" className="mt-4 max-h-96 overflow-y-auto pr-2 bg-white/5 rounded-md p-4 border border-white/10">
          <span className="font-semibold region-header">International</span>
          <Ul>
            <Li><Link href="https://www.amazon.com/">Amazon.com</Link></Li>
            <Li><Link href="https://www.amazon.de/">Amazon.de</Link></Li>
            <Li><Link href="https://www.amazon.co.uk/">Amazon.co.uk</Link></Li>
            <Li><Link href="https://www.amazon.se/">Amazon.se</Link></Li>
            <Li><Link href="https://www.ebay.com/">Ebay.com</Link></Li>
            <Li><Link href="https://www.ebay.co.uk/">Ebay.co.uk</Link></Li>
            <Li><Link href="https://www.ebay.de/">Ebay.de</Link></Li>
            <Li><Link href="https://www.aliexpress.com/">Aliexpress.com</Link></Li>
            <Li><Link href="https://www.apple.com/">Apple.com</Link></Li>
            <Li><Link href="https://www.etsy.com/">Etsy.com</Link></Li>
            <Li><Link href="https://www.adidas.com/">Adidas.com</Link></Li>
            <Li><Link href="https://www.samsung.com/">Samsung.com</Link></Li>
            <Li><Link href="https://www.nike.com/">Nike.com</Link></Li>
            <Li><Link href="https://www.temu.com/">Temu.com</Link></Li>
            <Li><Link href="https://www.shein.com/">Shein.com</Link></Li>
            <Li><Link href="https://www2.hm.com/">H&M</Link></Li>
            <Li><Link href="https://www.zara.com/">Zara.com</Link></Li>
          </Ul>

          <span className="font-semibold region-header">American</span>
          <Ul>
            <Li><Link href="https://www.target.com/">Target.com</Link></Li>
            <Li><Link href="https://www.homedepot.com/">HomeDepot.com</Link></Li>
            <Li><Link href="https://www.costco.com/">Costco.com</Link></Li>
            <Li><Link href="https://www.bestbuy.com/">BestBuy.com</Link></Li>
            <Li><Link href="https://www.kroger.com/">Kroger.com</Link></Li>
            <Li><Link href="https://www.wayfair.com/">Wayfair.com</Link></Li>
            <Li><Link href="https://www.lowes.com/">Lowes.com</Link></Li>
            <Li><Link href="https://www.macys.com/">Macys.com</Link></Li>
            <Li><Link href="https://www.chewy.com/">Chewy.com</Link></Li>
            <Li><Link href="https://www.gap.com/">Gap.com</Link></Li>
            <Li><Link href="https://www.wish.com/">Wish.com</Link></Li>
            <Li><Link href="https://www.lg.com/">LG.com</Link></Li>
            <Li><Link href="https://www.dell.com/">Dell.com</Link></Li>
            <Li><Link href="https://www.kohls.com/">Kohls.com</Link></Li>
            <Li><Link href="https://www.walgreens.com/">Walgreens.com</Link></Li>
            <Li><Link href="https://www.lenovo.com/">Lenovo.com</Link></Li>
            <Li><Link href="https://www.hp.com/">HP.com</Link></Li>
            <Li><Link href="https://www.ikea.com/">IKEA.com</Link></Li>
            <Li><Link href="https://www.nordstrom.com/">Nordstrom.com</Link></Li>
            <Li><Link href="https://www.fashionnova.com/">FashionNova.com</Link></Li>
            <Li><Link href="https://kyliecosmetics.com/">KylieCosmetics.com</Link></Li>
            <Li><Link href="https://colourpop.com/">ColourPop.com</Link></Li>
            <Li><Link href="https://jeffreestarcosmetics.com/">JeffreeStarCosmetics.com</Link></Li>
            <Li><Link href="https://www.gymshark.com/">Gymshark.com</Link></Li>
            <Li><Link href="https://www.allbirds.com/">Allbirds.com</Link></Li>
            <Li><Link href="https://www.brooklinen.com/">Brooklinen.com</Link></Li>
            <Li><Link href="https://ruggable.com/">Ruggable.com</Link></Li>
            <Li><Link href="https://shop.ruggable.com/">Shop.Ruggable.com</Link></Li>
            <Li><Link href="https://www.chubbiesshorts.com/">ChubbiesShorts.com</Link></Li>
            <Li><Link href="https://checkout.chubbiesshorts.com/">Checkout.ChubbiesShorts.com</Link></Li>
            <Li><Link href="https://www.puravidabracelets.com/">PuraVidaBracelets.com</Link></Li>
            <Li><Link href="https://www.nativecos.com/">NativeCos.com</Link></Li>
            <Li><Link href="https://www.hauslabs.com/">HausLabs.com</Link></Li>
            <Li><Link href="https://skknbykim.com/">SKKNbyKim.com</Link></Li>
            <Li><Link href="https://www.harney.com/">Harney.com</Link></Li>
            <Li><Link href="https://www.redbullshopus.com/">RedBullShopUS.com</Link></Li>
            <Li><Link href="https://tula.com/">Tula.com</Link></Li>
            <Li><Link href="https://checkout.tula.com/">Checkout.Tula.com</Link></Li>
            <Li><Link href="https://shop.tesla.com/">Shop.Tesla.com</Link></Li>
            <Li><Link href="https://spiritualgangster.com/">SpiritualGangster.com</Link></Li>
            <Li><Link href="https://www.taylorstitch.com/">TaylorStitch.com</Link></Li>
            <Li><Link href="https://www.american-giant.com/">American-Giant.com</Link></Li>
            <Li><Link href="https://www.drsquatch.com/">DrSquatch.com</Link></Li>
            <Li><Link href="https://mejuri.com/">Mejuri.com</Link></Li>
            <Li><Link href="https://checkout-uk.mejuri.com/">Checkout-UK.Mejuri.com</Link></Li>
            <Li><Link href="https://www.peets.com/">Peets.com</Link></Li>
            <Li><Link href="https://www.deathwishcoffee.com/">DeathWishCoffee.com</Link></Li>
            <Li><Link href="https://hellotushy.com/">HelloTushy.com</Link></Li>
            <Li><Link href="https://www.bando.com/">Bando.com</Link></Li>
            <Li><Link href="https://www.moroccanoil.com/">MoroccanOil.com</Link></Li>
            <Li><Link href="https://negativeunderwear.com/">NegativeUnderwear.com</Link></Li>
            <Li><Link href="https://birdies.com/">Birdies.com</Link></Li>
            <Li><Link href="https://naadam.co/">Naadam.co</Link></Li>
            <Li><Link href="https://www.popflexactive.com/">PopflexActive.com</Link></Li>
            <Li><Link href="https://www.moderncitizen.com/">ModernCitizen.com</Link></Li>
            <Li><Link href="https://greatjonesgoods.com/">GreatJonesGoods.com</Link></Li>
            <Li><Link href="https://pinklily.com/">PinkLily.com</Link></Li>
            <Li><Link href="https://misen.com/">Misen.com</Link></Li>
            <Li><Link href="https://materialkitchen.com/">MaterialKitchen.com</Link></Li>
            <Li><Link href="https://shop.hedleyandbennett.com/">Shop.HedleyAndBennett.com</Link></Li>
            <Li><Link href="https://www.rumpl.com/">Rumpl.com</Link></Li>
            <Li><Link href="https://checkout.mizzenandmain.com/">Checkout.MizzenAndMain.com</Link></Li>
            <Li><Link href="https://ohpolly.com/">OhPolly.com</Link></Li>
            <Li><Link href="https://checkout.tecovas.com/">Checkout.Tecovas.com</Link></Li>
            <Li><Link href="https://www.stance.com/">Stance.com</Link></Li>
            <Li><Link href="https://spongelle.com/">Spongelle.com</Link></Li>
            <Li><Link href="https://www.trueclassictees.com/">TrueClassicTees.com</Link></Li>
            <Li><Link href="https://checkout.meundies.com/">Checkout.MeUndies.com</Link></Li>
            <Li><Link href="https://studs.com/">Studs.com</Link></Li>
            <Li><Link href="https://jackhenry.co/">JackHenry.co</Link></Li>
            <Li><Link href="https://www.luxyhair.com/">LuxyHair.com</Link></Li>
            <Li><Link href="https://juicycouture.com/">JuicyCouture.com</Link></Li>
            <Li><Link href="https://www.everlast.com/">Everlast.com</Link></Li>
            <Li><Link href="https://checkout.skims.com/">Checkout.Skims.com</Link></Li>
            <Li><Link href="https://feals.com/">Feals.com</Link></Li>
            <Li><Link href="https://us.foursigmatic.com/">US.FourSigmatic.com</Link></Li>
            <Li><Link href="https://golde.co/">Golde.co</Link></Li>
            <Li><Link href="https://shop.liquid-iv.com/">Shop.Liquid-IV.com</Link></Li>
            <Li><Link href="https://www.thesill.com/">TheSill.com</Link></Li>
            <Li><Link href="https://www.wearlively.com/">WearLively.com</Link></Li>
            <Li><Link href="https://andieswim.com/">AndieSwim.com</Link></Li>
            <Li><Link href="https://yourparade.com/">YourParade.com</Link></Li>
            <Li><Link href="https://brightland.co/">Brightland.co</Link></Li>
            <Li><Link href="https://omsom.com/">Omsom.com</Link></Li>
            <Li><Link href="https://jenis.com/">Jenis.com</Link></Li>
            <Li><Link href="https://snowehome.com/">SnoweHome.com</Link></Li>
            <Li><Link href="https://www.graza.co/">Graza.co</Link></Li>
            <Li><Link href="https://shop.flybyjing.com/">Shop.FlyByJing.com</Link></Li>
            <Li><Link href="https://getmaude.com/">GetMaude.com</Link></Li>
            <Li><Link href="https://ugmonk.com/">Ugmonk.com</Link></Li>
          </Ul>

          <span className="font-semibold region-header">Danish</span>
          <Ul>
            <Li><Link href="https://www.zalando.dk/">Zalando.dk</Link></Li>
            <Li><Link href="https://www.matas.dk/">Matas.dk</Link></Li>
            <Li><Link href="https://www.proshop.dk/">Proshop.dk</Link></Li>
            <Li><Link href="https://www.boozt.com/">Boozt.com</Link></Li>
            <Li><Link href="https://www.harald-nyborg.dk/">Harald-Nyborg.dk</Link></Li>
            <Li><Link href="https://jysk.dk/">Jysk.dk</Link></Li>
            <Li><Link href="https://www.elgiganten.dk/">Elgiganten.dk</Link></Li>
            <Li><Link href="https://www.magasin.dk/">Magasin.dk</Link></Li>
            <Li><Link href="https://www.jemogfix.dk/">JemogFix.dk</Link></Li>
            <Li><Link href="https://www.bilka.dk/">Bilka.dk</Link></Li>
            <Li><Link href="https://www.foetex.dk/">Foetex.dk</Link></Li>
            <Li><Link href="https://www.saxo.com/">Saxo.com</Link></Li>
            <Li><Link href="https://www.thansen.dk/">Thansen.dk</Link></Li>
            <Li><Link href="https://www.imerco.dk/">Imerco.dk</Link></Li>
            <Li><Link href="https://www.xl-byg.dk/">XL-Byg.dk</Link></Li>
            <Li><Link href="https://www.sport24.dk/">Sport24.dk</Link></Li>
            <Li><Link href="https://www.bog-ide.dk/">Bog-Ide.dk</Link></Li>
            <Li><Link href="https://www.power.dk/">Power.dk</Link></Li>
            <Li><Link href="https://www.Plantorama.dk/">Plantorama.dk</Link></Li>
            <Li><Link href="https://www.kop-kande.dk/">Kop-Kande.dk</Link></Li>
            <Li><Link href="https://www.avxperten.dk/">AVXperten.dk</Link></Li>
            <Li><Link href="https://www.fleggaard.dk/">Fleggaard.dk</Link></Li>
            <Li><Link href="https://ilva.dk/">ILVA.dk</Link></Li>
            <Li><Link href="https://www.sportsworld.dk/">SportsWorld.dk</Link></Li>
            <Li><Link href="https://www.telenor.dk/">Telenor.dk</Link></Li>
            <Li><Link href="https://www.kids-world.dk/">Kids-World.dk</Link></Li>
            <Li><Link href="https://www.telia.dk/">Telia.dk</Link></Li>
            <Li><Link href="https://www.10-4.dk/">10-4.dk</Link></Li>
            <Li><Link href="https://www.asos.com/">ASOS.com</Link></Li>
            <Li><Link href="https://www.billigvvs.dk/">BilligVVS.dk</Link></Li>
            <Li><Link href="https://intersport.dk/">Intersport.dk</Link></Li>
            <Li><Link href="https://www.ticketmaster.dk/">TicketMaster.dk</Link></Li>
            <Li><Link href="https://www.telmore.dk/">Telmore.dk</Link></Li>
            <Li><Link href="https://www.ditur.dk/">Ditur.dk</Link></Li>
            <Li><Link href="https://www.quint.dk/">Quint.dk</Link></Li>
            <Li><Link href="https://www.maxizoo.dk/">MaxiZoo.dk</Link></Li>
            <Li><Link href="https://www.fribikeshop.dk/">FriBikeShop.dk</Link></Li>
            <Li><Link href="https://www.just-eat.dk/">Just-Eat.dk</Link></Li>
            <Li><Link href="https://www.bygma.dk/">Bygma.dk</Link></Li>
            <Li><Link href="https://www.williamdam.dk/">WilliamDam.dk</Link></Li>
            <Li><Link href="https://www.av-cables.dk/">AV-Cables.dk</Link></Li>
            <Li><Link href="https://www.plantetorvet.dk/">Plantetorvet.dk</Link></Li>
            <Li><Link href="https://salling.dk/">Salling.dk</Link></Li>
            <Li><Link href="https://luksusbaby.dk/">LuksusBaby.dk</Link></Li>
            <Li><Link href="https://www.apotekeren.dk/">Apotekeren.dk</Link></Li>
            <Li><Link href="https://www.lampeguru.dk/">LampeGuru.dk</Link></Li>
            <Li><Link href="https://www.billetlugen.dk/">Billetlugen.dk</Link></Li>
            <Li><Link href="https://www.computersalg.dk/">ComputerSalg.dk</Link></Li>
            <Li><Link href="https://havehandel.dk/">HaveHandel.dk</Link></Li>
            <Li><Link href="https://www.sinful.dk/">Sinful.dk</Link></Li>
            <Li><Link href="https://www.kaufmann.dk/">Kaufmann.dk</Link></Li>
            <Li><Link href="https://www.callme.dk/">CallMe.dk</Link></Li>
            <Li><Link href="https://www.hyggeonkel.dk/">HyggeOnkel.dk</Link></Li>
            <Li><Link href="https://legeakademiet.dk/">LegeAkademiet.dk</Link></Li>
            <Li><Link href="https://www.lampemesteren.dk/">LampeMesteren.dk</Link></Li>
            <Li><Link href="https://www.zooplus.dk/">ZooPlus.dk</Link></Li>
            <Li><Link href="https://www.loebeshop.dk/">LoebeShop.dk</Link></Li>
            <Li><Link href="https://loberen.dk/">Loberen.dk</Link></Li>
            <Li><Link href="https://www.cocopanda.dk/">Cocopanda.dk</Link></Li>
            <Li><Link href="https://www.calle.dk/">Calle.dk</Link></Li>
            <Li><Link href="https://www.mytrendyphone.dk/">MyTrendyPhone.dk</Link></Li>
            <Li><Link href="https://www.jacobsenplus.dk/">JacobsenPlus.dk</Link></Li>
            <Li><Link href="https://greenmind.dk/">GreenMind.dk</Link></Li>
            <Li><Link href="https://www.cchobby.dk/">CCHobby.dk</Link></Li>
            <Li><Link href="https://www.komplett.dk/">Komplett.dk</Link></Li>
            <Li><Link href="https://www.billigparfume.dk/">BilligParfume.dk</Link></Li>
            <Li><Link href="https://www.faraos.dk/">Faraos.dk</Link></Li>
            <Li><Link href="https://www.feline.dk/">Feline.dk</Link></Li>
            <Li><Link href="https://www.kitchenone.dk/">KitchenOne.dk</Link></Li>
            <Li><Link href="https://moebelkompagniet.dk/">MoebelKompagniet.dk</Link></Li>
            <Li><Link href="https://www.luxoliving.dk/">LuxoLiving.dk</Link></Li>
            <Li><Link href="https://www.av-connection.dk/">AV-Connection.dk</Link></Li>
            <Li><Link href="https://sneakerzone.dk/">SneakerZone.dk</Link></Li>
            <Li><Link href="https://www.partyking.dk/">PartyKing.dk</Link></Li>
            <Li><Link href="https://www.bygmax.dk/">BygMax.dk</Link></Li>
            <Li><Link href="https://www.daells-bolighus.dk/">Daells-Bolighus.dk</Link></Li>
            <Li><Link href="https://www.greenline.dk/">GreenLine.dk</Link></Li>
            <Li><Link href="https://www.punkt1.dk/">Punkt1.dk</Link></Li>
            <Li><Link href="https://www.illumsbolighus.dk/">IllumsBolighus.dk</Link></Li>
            <Li><Link href="https://www.lirumlarumleg.dk/">LirumLarumLeg.dk</Link></Li>
            <Li><Link href="https://www.coolstuff.dk/">CoolStuff.dk</Link></Li>
            <Li><Link href="https://www.mobilcovers.dk/">MobilCovers.dk</Link></Li>
            <Li><Link href="https://www.grejfreak.dk/">GrejFreak.dk</Link></Li>
            <Li><Link href="https://www.flugger.dk/">Flugger.dk</Link></Li>
            <Li><Link href="https://ingvardchristensen.dk/">IngvardChristensen.dk</Link></Li>
            <Li><Link href="https://mobler.dk/">Mobler.dk</Link></Li>
            <Li><Link href="https://www.adidas.dk/">Adidas.dk</Link></Li>
            <Li><Link href="https://klaedeskabet.dk/">Klaedeskabet.dk</Link></Li>
          </Ul>
        </div>
      </Text>

      {/* Second Text Block */}

      <Header variant="h1">Analytics</Header>
      <Text>
        The extension is only active on a fixed list of known shopping domains,
        leaving all your other browsing out of analytics. For research purposes,
        we collect completely anonymous data to protect your privacy.
        Specifically:
        <Ul>
          <Li>No identifying information is ever tied to the data.</Li>
          <Li>All data is aggregated before any use. </Li>
          <Li>Data is not sold or shared with third parties. </Li>
        </Ul>
        For full transparency, the extension’s open-source code is available
        here on our{" "}
        <Link href="https://github.com/Grymse/anti-impulsive-purchasing">
          GitHub
        </Link>
        . In addition, be sure to read our Terms of Service before use.
      </Text>

      {/* Third Text Block */}
      <br />
      <Header variant="h1">Terms of Service</Header>
      <Text>A description of the terms of service</Text>

      <Header variant="h2">Introduction</Header>
      <Text>
        Welcome to Less, a browser extension developed as part of a thesis on
        reducing impulse purchasing habits. This extension aims to gather
        insights into user behavior and help develop strategies to minimize
        impulse purchases. By installing or using this extension, you agree to
        the following terms and conditions.
      </Text>

      <Header variant="h2">Eligibility</Header>
      <Text>
        Use of this extension is intended for individuals aged 18 and older who
        are interested in contributing to research on mitigating impulse
        purchasing behaviors.
      </Text>

      <Header variant="h2">Voluntary Participation</Header>
      <Text>
        Your use of this extension is entirely voluntary. You may discontinue
        use at any time without any consequences or obligations. There is no
        requirement to continue using the extension once installed, and you may
        disable or remove it at will.
      </Text>

      <Header variant="h2">Data Collection and Usage</Header>
      <Text>
        The data collected include information about your browsing activity on
        the listed websites above, along with details about the amount of
        purchases, and products individual pricing. All collected data will be
        anonymized and used solely for academic research purposes related to
        reducing impulse purchasing behavior. This information may also appear
        in publications or presentations based on the research.
      </Text>

      <Header variant="h2">Confidentiality and Privacy</Header>
      <Text>
        Your privacy is paramount. Any personal data is processed and stored
        securely, in accordance with applicable privacy regulations (e.g., GDPR,
        CCPA). Identifiable data, if collected, will not be shared with third
        parties or used for purposes unrelated to this research. All published
        research findings will be reported in a manner that safeguards
        anonymity.
      </Text>

      {/* Data Security */}

      <Header variant="h2">Data Security</Header>
      <Text>
        All collected data is stored securely using Supabase database service.
        Reasonable measures are in place to prevent unauthorized access, loss,
        or disclosure.
      </Text>

      {/* Liability Disclaimer */}

      <Header variant="h2">Liability Disclaimer</Header>
      <Text>
        Although efforts are made to secure your data, Nicolai Grymer and
        IT-University of Copenhagen are not liable for any unauthorized access
        or unforeseen data breaches that may occur despite best practices.
      </Text>

      {/* Right to Withdraw and Data Removal */}

      <Header variant="h2">Right to Withdraw and Data Removal</Header>
      <Text>
        If, after providing data through the extension, you wish to withdraw
        your anonymized data from the study, you must make a request within 30
        days of your usage. After this period, data may be aggregated and fully
        anonymized, making specific entries unidentifiable and thus impossible
        to remove. To request data removal, please contact us promptly at the
        emails listed below.
      </Text>

      {/* Contact Information */}

      <Header variant="h2">Contact Information</Header>
      <Text>
        For any questions or concerns regarding this extension, your
        participation, or the data collected, please contact:
        <Ul>
          <Li>
            Nicolai Grymer: <Link href="mailto:ngry@itu.dk">ngry@itu.dk</Link>
          </Li>
          <Li>
            Frederik Rothe: <Link href="mailto:frot@itu.dk">frot@itu.dk</Link>
          </Li>
        </Ul>
      </Text>

      {/* Consent */}

      <Header variant="h2">Consent</Header>
      <Text>
        By installing and using this extension, you confirm that you have read,
        understood, and agree to these Terms of Service. Your continued usage
        constitutes your consent to be part of the research under the outlined
        terms.
      </Text>

      {/* Thank You */}
      <Text>Thank you for participating in our research.</Text>

      <br />
      <br />

      <Text>
        The Less team
        <br />
        <span className="text-muted-foreground">
          Nicolai Grymer & Frederik Rothe
          <br />
          IT-University of Copenhagen
        </span>
      </Text>
    </div>
  );
}

function disableButtons(event: any) {
  const buttons = event.target.parentElement.querySelectorAll("button");
  buttons.forEach((button: any) => {
    button.disabled = true;
  });
}
