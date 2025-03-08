import { useState } from 'react';
import Text from './Text';

import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import Header from './Header';

// Type definitions for website data
interface Website {
  url: string;
  name: string;
}

interface WebsiteCategory {
  category: string;
  websites: Website[];
}

// Website data organized by category
const websiteCategories: WebsiteCategory[] = [
  {
    category: "International",
    websites: [
      { url: "https://www.amazon.com/", name: "Amazon.com" },
      { url: "https://www.amazon.de/", name: "Amazon.de" },
      { url: "https://www.amazon.co.uk/", name: "Amazon.co.uk" },
      { url: "https://www.amazon.se/", name: "Amazon.se" },
      { url: "https://www.ebay.com/", name: "Ebay.com" },
      { url: "https://www.ebay.co.uk/", name: "Ebay.co.uk" },
      { url: "https://www.ebay.de/", name: "Ebay.de" },
      { url: "https://www.aliexpress.com/", name: "Aliexpress.com" },
      { url: "https://www.apple.com/", name: "Apple.com" },
      { url: "https://www.etsy.com/", name: "Etsy.com" },
      { url: "https://www.adidas.com/", name: "Adidas.com" },
      { url: "https://www.samsung.com/", name: "Samsung.com" },
      { url: "https://www.nike.com/", name: "Nike.com" },
      { url: "https://www.temu.com/", name: "Temu.com" },
      { url: "https://www.shein.com/", name: "Shein.com" },
      { url: "https://www2.hm.com/", name: "H&M" },
      { url: "https://www.zara.com/", name: "Zara.com" },
    ],
  },
  {
    category: "American",
    websites: [
      { url: "https://www.target.com/", name: "Target.com" },
      { url: "https://www.homedepot.com/", name: "HomeDepot.com" },
      { url: "https://www.costco.com/", name: "Costco.com" },
      { url: "https://www.bestbuy.com/", name: "BestBuy.com" },
      { url: "https://www.kroger.com/", name: "Kroger.com" },
      { url: "https://www.wayfair.com/", name: "Wayfair.com" },
      { url: "https://www.lowes.com/", name: "Lowes.com" },
      { url: "https://www.macys.com/", name: "Macys.com" },
      { url: "https://www.chewy.com/", name: "Chewy.com" },
      { url: "https://www.gap.com/", name: "Gap.com" },
      { url: "https://www.wish.com/", name: "Wish.com" },
      { url: "https://www.lg.com/", name: "LG.com" },
      { url: "https://www.dell.com/", name: "Dell.com" },
      { url: "https://www.kohls.com/", name: "Kohls.com" },
      { url: "https://www.walgreens.com/", name: "Walgreens.com" },
      { url: "https://www.lenovo.com/", name: "Lenovo.com" },
      { url: "https://www.hp.com/", name: "HP.com" },
      { url: "https://www.ikea.com/", name: "IKEA.com" },
      { url: "https://www.nordstrom.com/", name: "Nordstrom.com" },
      { url: "https://www.fashionnova.com/", name: "FashionNova.com" },
      { url: "https://kyliecosmetics.com/", name: "KylieCosmetics.com" },
      { url: "https://colourpop.com/", name: "ColourPop.com" },
      { url: "https://jeffreestarcosmetics.com/", name: "JeffreeStarCosmetics.com" },
      { url: "https://www.gymshark.com/", name: "Gymshark.com" },
      { url: "https://www.allbirds.com/", name: "Allbirds.com" },
      { url: "https://www.brooklinen.com/", name: "Brooklinen.com" },
      { url: "https://ruggable.com/", name: "Ruggable.com" },
      { url: "https://shop.ruggable.com/", name: "Shop.Ruggable.com" },
      { url: "https://www.chubbiesshorts.com/", name: "ChubbiesShorts.com" },
      { url: "https://checkout.chubbiesshorts.com/", name: "Checkout.ChubbiesShorts.com" },
      { url: "https://www.puravidabracelets.com/", name: "PuraVidaBracelets.com" },
      { url: "https://www.nativecos.com/", name: "NativeCos.com" },
      { url: "https://www.hauslabs.com/", name: "HausLabs.com" },
      { url: "https://skknbykim.com/", name: "SKKNbyKim.com" },
      { url: "https://www.harney.com/", name: "Harney.com" },
      { url: "https://www.redbullshopus.com/", name: "RedBullShopUS.com" },
      { url: "https://tula.com/", name: "Tula.com" },
      { url: "https://checkout.tula.com/", name: "Checkout.Tula.com" },
      { url: "https://shop.tesla.com/", name: "Shop.Tesla.com" },
      { url: "https://spiritualgangster.com/", name: "SpiritualGangster.com" },
      { url: "https://www.taylorstitch.com/", name: "TaylorStitch.com" },
      { url: "https://www.american-giant.com/", name: "American-Giant.com" },
      { url: "https://www.drsquatch.com/", name: "DrSquatch.com" },
      { url: "https://mejuri.com/", name: "Mejuri.com" },
      { url: "https://checkout-uk.mejuri.com/", name: "Checkout-UK.Mejuri.com" },
      { url: "https://www.peets.com/", name: "Peets.com" },
      { url: "https://www.deathwishcoffee.com/", name: "DeathWishCoffee.com" },
      { url: "https://hellotushy.com/", name: "HelloTushy.com" },
      { url: "https://www.bando.com/", name: "Bando.com" },
      { url: "https://www.moroccanoil.com/", name: "MoroccanOil.com" },
      { url: "https://negativeunderwear.com/", name: "NegativeUnderwear.com" },
      { url: "https://birdies.com/", name: "Birdies.com" },
      { url: "https://naadam.co/", name: "Naadam.co" },
      { url: "https://www.popflexactive.com/", name: "PopflexActive.com" },
      { url: "https://www.moderncitizen.com/", name: "ModernCitizen.com" },
      { url: "https://greatjonesgoods.com/", name: "GreatJonesGoods.com" },
      { url: "https://pinklily.com/", name: "PinkLily.com" },
      { url: "https://misen.com/", name: "Misen.com" },
      { url: "https://materialkitchen.com/", name: "MaterialKitchen.com" },
      { url: "https://shop.hedleyandbennett.com/", name: "Shop.HedleyAndBennett.com" },
      { url: "https://www.rumpl.com/", name: "Rumpl.com" },
      { url: "https://checkout.mizzenandmain.com/", name: "Checkout.MizzenAndMain.com" },
      { url: "https://ohpolly.com/", name: "OhPolly.com" },
      { url: "https://checkout.tecovas.com/", name: "Checkout.Tecovas.com" },
      { url: "https://www.stance.com/", name: "Stance.com" },
      { url: "https://spongelle.com/", name: "Spongelle.com" },
      { url: "https://www.trueclassictees.com/", name: "TrueClassicTees.com" },
      { url: "https://checkout.meundies.com/", name: "Checkout.MeUndies.com" },
      { url: "https://studs.com/", name: "Studs.com" },
      { url: "https://jackhenry.co/", name: "JackHenry.co" },
      { url: "https://www.luxyhair.com/", name: "LuxyHair.com" },
      { url: "https://juicycouture.com/", name: "JuicyCouture.com" },
      { url: "https://www.everlast.com/", name: "Everlast.com" },
      { url: "https://checkout.skims.com/", name: "Checkout.Skims.com" },
      { url: "https://feals.com/", name: "Feals.com" },
      { url: "https://us.foursigmatic.com/", name: "US.FourSigmatic.com" },
      { url: "https://golde.co/", name: "Golde.co" },
      { url: "https://shop.liquid-iv.com/", name: "Shop.Liquid-IV.com" },
      { url: "https://www.thesill.com/", name: "TheSill.com" },
      { url: "https://www.wearlively.com/", name: "WearLively.com" },
      { url: "https://andieswim.com/", name: "AndieSwim.com" },
      { url: "https://yourparade.com/", name: "YourParade.com" },
      { url: "https://brightland.co/", name: "Brightland.co" },
      { url: "https://omsom.com/", name: "Omsom.com" },
      { url: "https://jenis.com/", name: "Jenis.com" },
      { url: "https://snowehome.com/", name: "SnoweHome.com" },
      { url: "https://www.graza.co/", name: "Graza.co" },
      { url: "https://shop.flybyjing.com/", name: "Shop.FlyByJing.com" },
      { url: "https://getmaude.com/", name: "GetMaude.com" },
      { url: "https://ugmonk.com/", name: "Ugmonk.com" },
    ],
  },
  {
    category: "Danish",
    websites: [
      { url: "https://www.zalando.dk/", name: "Zalando.dk" },
      { url: "https://www.matas.dk/", name: "Matas.dk" },
      { url: "https://www.proshop.dk/", name: "Proshop.dk" },
      { url: "https://www.boozt.com/", name: "Boozt.com" },
      { url: "https://www.harald-nyborg.dk/", name: "Harald-Nyborg.dk" },
      { url: "https://jysk.dk/", name: "Jysk.dk" },
      { url: "https://www.elgiganten.dk/", name: "Elgiganten.dk" },
      { url: "https://www.magasin.dk/", name: "Magasin.dk" },
      { url: "https://www.jemogfix.dk/", name: "JemogFix.dk" },
      { url: "https://www.bilka.dk/", name: "Bilka.dk" },
      { url: "https://www.foetex.dk/", name: "Foetex.dk" },
      { url: "https://www.saxo.com/", name: "Saxo.com" },
      { url: "https://www.thansen.dk/", name: "Thansen.dk" },
      { url: "https://www.imerco.dk/", name: "Imerco.dk" },
      { url: "https://www.xl-byg.dk/", name: "XL-Byg.dk" },
      { url: "https://www.sport24.dk/", name: "Sport24.dk" },
      { url: "https://www.bog-ide.dk/", name: "Bog-Ide.dk" },
      { url: "https://www.power.dk/", name: "Power.dk" },
      { url: "https://www.Plantorama.dk/", name: "Plantorama.dk" },
      { url: "https://www.kop-kande.dk/", name: "Kop-Kande.dk" },
      { url: "https://www.avxperten.dk/", name: "AVXperten.dk" },
      { url: "https://www.fleggaard.dk/", name: "Fleggaard.dk" },
      { url: "https://ilva.dk/", name: "ILVA.dk" },
      { url: "https://www.sportsworld.dk/", name: "SportsWorld.dk" },
      { url: "https://www.telenor.dk/", name: "Telenor.dk" },
      { url: "https://www.kids-world.dk/", name: "Kids-World.dk" },
      { url: "https://www.telia.dk/", name: "Telia.dk" },
      { url: "https://www.10-4.dk/", name: "10-4.dk" },
      { url: "https://www.asos.com/", name: "ASOS.com" },
      { url: "https://www.billigvvs.dk/", name: "BilligVVS.dk" },
      { url: "https://intersport.dk/", name: "Intersport.dk" },
      { url: "https://www.ticketmaster.dk/", name: "TicketMaster.dk" },
      { url: "https://www.telmore.dk/", name: "Telmore.dk" },
      { url: "https://www.ditur.dk/", name: "Ditur.dk" },
      { url: "https://www.quint.dk/", name: "Quint.dk" },
      { url: "https://www.maxizoo.dk/", name: "MaxiZoo.dk" },
      { url: "https://www.fribikeshop.dk/", name: "FriBikeShop.dk" },
      { url: "https://www.just-eat.dk/", name: "Just-Eat.dk" },
      { url: "https://www.bygma.dk/", name: "Bygma.dk" },
      { url: "https://www.williamdam.dk/", name: "WilliamDam.dk" },
      { url: "https://www.av-cables.dk/", name: "AV-Cables.dk" },
      { url: "https://www.plantetorvet.dk/", name: "Plantetorvet.dk" },
      { url: "https://salling.dk/", name: "Salling.dk" },
      { url: "https://luksusbaby.dk/", name: "LuksusBaby.dk" },
      { url: "https://www.apotekeren.dk/", name: "Apotekeren.dk" },
      { url: "https://www.lampeguru.dk/", name: "LampeGuru.dk" },
      { url: "https://www.billetlugen.dk/", name: "Billetlugen.dk" },
      { url: "https://www.computersalg.dk/", name: "ComputerSalg.dk" },
      { url: "https://havehandel.dk/", name: "HaveHandel.dk" },
      { url: "https://www.sinful.dk/", name: "Sinful.dk" },
      { url: "https://www.kaufmann.dk/", name: "Kaufmann.dk" },
      { url: "https://www.callme.dk/", name: "CallMe.dk" },
      { url: "https://www.hyggeonkel.dk/", name: "HyggeOnkel.dk" },
      { url: "https://legeakademiet.dk/", name: "LegeAkademiet.dk" },
      { url: "https://www.lampemesteren.dk/", name: "LampeMesteren.dk" },
      { url: "https://www.zooplus.dk/", name: "ZooPlus.dk" },
      { url: "https://www.loebeshop.dk/", name: "LoebeShop.dk" },
      { url: "https://loberen.dk/", name: "Loberen.dk" },
      { url: "https://www.cocopanda.dk/", name: "Cocopanda.dk" },
      { url: "https://www.calle.dk/", name: "Calle.dk" },
      { url: "https://www.mytrendyphone.dk/", name: "MyTrendyPhone.dk" },
      { url: "https://www.jacobsenplus.dk/", name: "JacobsenPlus.dk" },
      { url: "https://greenmind.dk/", name: "GreenMind.dk" },
      { url: "https://www.cchobby.dk/", name: "CCHobby.dk" },
      { url: "https://www.komplett.dk/", name: "Komplett.dk" },
      { url: "https://www.billigparfume.dk/", name: "BilligParfume.dk" },
      { url: "https://www.faraos.dk/", name: "Faraos.dk" },
      { url: "https://www.feline.dk/", name: "Feline.dk" },
      { url: "https://www.kitchenone.dk/", name: "KitchenOne.dk" },
      { url: "https://moebelkompagniet.dk/", name: "MoebelKompagniet.dk" },
      { url: "https://www.luxoliving.dk/", name: "LuxoLiving.dk" },
      { url: "https://www.av-connection.dk/", name: "AV-Connection.dk" },
      { url: "https://sneakerzone.dk/", name: "SneakerZone.dk" },
      { url: "https://www.partyking.dk/", name: "PartyKing.dk" },
      { url: "https://www.bygmax.dk/", name: "BygMax.dk" },
      { url: "https://www.daells-bolighus.dk/", name: "Daells-Bolighus.dk" },
      { url: "https://www.greenline.dk/", name: "GreenLine.dk" },
      { url: "https://www.punkt1.dk/", name: "Punkt1.dk" },
      { url: "https://www.illumsbolighus.dk/", name: "IllumsBolighus.dk" },
      { url: "https://www.lirumlarumleg.dk/", name: "LirumLarumLeg.dk" },
      { url: "https://www.coolstuff.dk/", name: "CoolStuff.dk" },
      { url: "https://www.mobilcovers.dk/", name: "MobilCovers.dk" },
      { url: "https://www.grejfreak.dk/", name: "GrejFreak.dk" },
      { url: "https://www.flugger.dk/", name: "Flugger.dk" },
      { url: "https://ingvardchristensen.dk/", name: "IngvardChristensen.dk" },
      { url: "https://mobler.dk/", name: "Mobler.dk" },
      { url: "https://www.adidas.dk/", name: "Adidas.dk" },
      { url: "https://klaedeskabet.dk/", name: "Klaedeskabet.dk" },
    ],
  },
];


function roundDownToClosestTen(num: number) {
  return Math.floor(num / 10) * 10
}

const amountOfWebsites = roundDownToClosestTen(websiteCategories.reduce((acc, category) => acc + category.websites.length, 0));

// Component to render the website search and list
export const WebsiteList = () => {
  const [search, setSearch] = useState<string>("");
  const lowercaseSearch = search.toLowerCase();

  function filterWebsite(website: Website) {
    if (search.trim() === "") return true;
    return website.name.toLowerCase().includes(lowercaseSearch);
  }

  return (
    <div className="space-y-4">
      <Text className="mb-4">
        The extension currently supports over {amountOfWebsites} shopping sites. Use the
        search box below to check if your favorite site is supported:
      </Text>
      <Input
        type="text"
        placeholder="Search for a website..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <Card className="mt-10">
        <CardContent>
          <div className="h-96 max-h-96 overflow-y-scroll">
          {websiteCategories.map((category) => (
            <div key={category.category}>
              <Header variant="h2" className='w-full text-center mb-4'>{category.category}</Header>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {category.websites.filter(filterWebsite).map((website) => (
                    <a key={website.url} href={website.url} className="flex flex-col w-full items-center p-4 border rounded shadow-sm hover:bg-accent">
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain=${website.url}`}
                      alt={`${website.name} favicon`}
                      className="w-8 h-8 mb-2"
                    />
                    <p className="text-sm text-center text-wrap overflow-hidden w-full max-w-full">{website.name}</p>
                    </a>
                ))}
                </div>
            </div>
          ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};