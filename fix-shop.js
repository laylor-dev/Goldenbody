const fs = require('fs');
const path = 'c:/Users/Laylo/Downloads/golden-body(1)/components/ShopCatalog.tsx';
let c = fs.readFileSync(path, 'utf8');

// Fix s.reviews -> literal
c = c.replace('{selectedProduct.reviews} {s.reviews}', '{selectedProduct.reviews} reviews');

// Remove productDescription block (Windows CRLF)
c = c.replace(
    '\r\n                                             <div className="pt-2">\r\n                                                 <p className="text-neutral-600 leading-relaxed text-sm">\r\n                                                     {s.productDescription}\r\n                                                 </p>\r\n                                             </div>',
    ''
);

// Fix share button titles
c = c.replace(/title=\{s\.shareOnWhatsapp\}/g, 'title="WhatsApp"');
c = c.replace(/title=\{s\.shareOnFacebook\}/g, 'title="Facebook"');
c = c.replace(/title=\{s\.shareOnTelegram\}/g, 'title="Telegram"');
c = c.replace(/title=\{s\.copyLink\}/g, 'title="Copy Link"');

fs.writeFileSync(path, c, 'utf8');
console.log('ShopCatalog.tsx fixed successfully');
