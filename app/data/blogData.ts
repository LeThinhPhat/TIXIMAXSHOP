export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
};

export const allPosts: BlogPost[] = [
  {
    slug: "huong-dan-tao-muc-luc",
    title: "Hướng dẫn tạo mục lục cho bài viết dài",
    date: "28 Tháng 6, 2022",
    image: "/blog/featured.jpg",
    excerpt:
      "Mục lục giúp bài viết trở nên rõ ràng, dễ theo dõi hơn và cải thiện trải nghiệm người đọc.",
    content: `
Mục lục là một trong những yếu tố quan trọng giúp người đọc dễ dàng điều hướng trong các bài viết dài. Khi bài viết có cấu trúc rõ ràng với mục lục, người đọc có thể nhanh chóng tìm đến phần thông tin họ cần mà không phải cuộn qua toàn bộ nội dung.

## Tại sao cần mục lục?

Một bài viết chất lượng không chỉ cần nội dung hay mà còn cần cách trình bày khoa học. Mục lục đóng vai trò như một bản đồ dẫn đường, giúp người đọc:

- Nắm được tổng quan nội dung bài viết ngay từ đầu
- Chuyển đến phần quan tâm một cách nhanh chóng
- Quay lại đúng vị trí sau khi rời trang

## Cách tạo mục lục hiệu quả

**Bước 1:** Xác định các tiêu đề chính (H2) và tiêu đề phụ (H3) trong bài viết. Đây là xương sống của mục lục.

**Bước 2:** Đặt neo (anchor) cho từng tiêu đề bằng thuộc tính \`id\`. Ví dụ: \`<h2 id="phan-1">Phần 1</h2>\`.

**Bước 3:** Tạo danh sách liên kết tương ứng trong mục lục, mỗi liên kết trỏ đến anchor tương ứng.

**Bước 4:** Đặt mục lục ngay sau đoạn mở đầu để người đọc thấy ngay khi vào bài.

## Mẹo tối ưu SEO

Mục lục không chỉ giúp người đọc mà còn hỗ trợ SEO đáng kể. Google thường hiển thị các liên kết nhảy (jump links) từ mục lục trong kết quả tìm kiếm, giúp bài viết chiếm nhiều diện tích hơn trên trang kết quả và tăng tỷ lệ nhấp.

Hãy đảm bảo các tiêu đề trong mục lục chứa từ khóa tự nhiên và mô tả đúng nội dung từng phần.

## Kết luận

Đầu tư thời gian tạo mục lục chất lượng sẽ mang lại trải nghiệm tốt hơn cho người đọc và cải thiện hiệu quả SEO cho bài viết của bạn. Đây là một kỹ năng nhỏ nhưng tạo ra sự khác biệt lớn.
    `.trim(),
  },
  {
    slug: "giai-thuong-sach-quoc-gia-24-tac-pham",
    title: "24 tác phẩm xuất sắc được vinh danh tại Giải thưởng Sách Quốc gia",
    date: "26 Tháng 11, 2021",
    image: "/blog/post-01.jpg",
    excerpt:
      "Lễ trao Giải thưởng Sách Quốc gia lần thứ tư ghi nhận 24 tác phẩm xuất sắc trên nhiều lĩnh vực.",
    content: `
Giải thưởng Sách Quốc gia lần thứ tư vừa diễn ra trang trọng tại Hà Nội, vinh danh 24 tác phẩm xuất sắc trên nhiều lĩnh vực từ khoa học xã hội, văn học đến khoa học kỹ thuật.

## Các hạng mục giải thưởng

Năm nay, Ban tổ chức đã nhận được hơn 500 tác phẩm dự thi từ khắp cả nước. Qua nhiều vòng thẩm định nghiêm túc, 24 tác phẩm đã được lựa chọn để trao giải ở các hạng mục:

- **Sách lý luận chính trị** – 5 tác phẩm
- **Sách văn học nghệ thuật** – 7 tác phẩm  
- **Sách khoa học công nghệ** – 6 tác phẩm
- **Sách thiếu nhi** – 3 tác phẩm
- **Sách được dịch** – 3 tác phẩm

## Ý nghĩa của giải thưởng

Theo đại diện Ban tổ chức, Giải thưởng Sách Quốc gia không chỉ là sự ghi nhận cho các tác giả, nhà xuất bản mà còn là động lực để cộng đồng xuất bản Việt Nam không ngừng nâng cao chất lượng.

Nhiều tác phẩm đoạt giải năm nay đã được độc giả đón nhận nồng nhiệt trước khi tham dự giải, cho thấy sự đồng thuận giữa Hội đồng giám khảo và công chúng đọc sách.

## Nhìn về tương lai

Ban tổ chức kỳ vọng giải thưởng sẽ tiếp tục trở thành kim chỉ nam cho ngành xuất bản, khuyến khích sản xuất các đầu sách có giá trị học thuật và nhân văn cao.
    `.trim(),
  },
  {
    slug: "doanh-nhan-viet-sach",
    title:
      "Khuyến khích doanh nhân viết sách để lan tỏa tri thức và kinh nghiệm",
    date: "25 Tháng 11, 2021",
    image: "/blog/post-02.jpg",
    excerpt:
      "Nhiều doanh nhân thành đạt đang được khuyến khích chia sẻ hành trình kinh doanh qua những trang sách.",
    content: `
Trong bối cảnh kinh tế số phát triển mạnh mẽ, việc các doanh nhân chia sẻ kinh nghiệm qua sách ngày càng được coi trọng. Đây không chỉ là cách lưu giữ tri thức mà còn là công cụ xây dựng thương hiệu cá nhân hiệu quả.

## Tại sao doanh nhân nên viết sách?

Một cuốn sách từ người trong cuộc mang lại giá trị thực tiễn mà các giáo trình học thuật khó có thể thay thế. Người đọc không chỉ học được kiến thức mà còn cảm nhận được hành trình, cảm xúc và bài học xương máu từ người đi trước.

## Những thách thức thường gặp

Nhiều doanh nhân ngại viết vì cho rằng mình không có tài năng văn chương. Tuy nhiên, điều quan trọng nhất của một cuốn sách kinh doanh là **giá trị nội dung**, không phải văn phong hoa mỹ.

Các giải pháp phổ biến hiện nay bao gồm làm việc cùng biên tập viên ghost-writing, hoặc tham gia các chương trình hỗ trợ xuất bản dành cho doanh nhân.

## Kết quả thực tế

Nhiều doanh nhân sau khi xuất bản sách đã ghi nhận sự gia tăng đáng kể về uy tín thương hiệu, cơ hội diễn thuyết và mạng lưới kết nối trong ngành.
    `.trim(),
  },
  {
    slug: "bao-ve-chu-quyen-khong-gian-mang",
    title: "Nhận thức mới về bảo vệ chủ quyền quốc gia trên không gian mạng",
    date: "25 Tháng 11, 2021",
    image: "/blog/post-03.jpg",
    excerpt:
      "An ninh mạng đang trở thành một trong những ưu tiên hàng đầu trong chiến lược bảo vệ chủ quyền quốc gia.",
    content: `
Không gian mạng đã trở thành chiến trường mới trong thế kỷ 21. Các quốc gia trên thế giới đang gấp rút xây dựng năng lực phòng thủ số để bảo vệ lợi ích quốc gia trước các mối đe dọa ngày càng tinh vi.

## Không gian mạng – Lãnh thổ thứ năm

Bên cạnh đất liền, biển, trên không và vũ trụ, không gian mạng đã được nhiều quốc gia chính thức công nhận là "lãnh thổ thứ năm" cần được bảo vệ nghiêm ngặt.

Điều này đòi hỏi một chiến lược toàn diện bao gồm: khung pháp lý, lực lượng chuyên trách, và hợp tác quốc tế.

## Các mối đe dọa hiện hữu

- Tấn công vào cơ sở hạ tầng trọng yếu (điện lực, tài chính, y tế)
- Chiến tranh thông tin và tin tức giả mạo
- Gián điệp mạng đánh cắp bí mật nhà nước
- Tấn công vào hệ thống bầu cử và dân chủ

## Hướng đi cho Việt Nam

Việt Nam đã và đang tích cực xây dựng lực lượng an ninh mạng chuyên nghiệp, đồng thời ban hành các văn bản pháp luật để điều chỉnh hoạt động trên không gian mạng, tạo hành lang pháp lý vững chắc cho sự phát triển bền vững.
    `.trim(),
  },
  {
    slug: "sach-giai-thuong-quoc-gia-lan-tu",
    title: "Những cuốn sách đoạt Giải thưởng Sách Quốc gia lần thứ tư",
    date: "16 Tháng 11, 2021",
    image: "/blog/post-04.jpg",
    excerpt:
      "Điểm qua những đầu sách nổi bật nhất vừa được vinh danh tại lễ trao Giải thưởng Sách Quốc gia.",
    content: `
Giải thưởng Sách Quốc gia lần thứ tư đã khép lại với nhiều dấu ấn đáng nhớ. Hãy cùng điểm qua những cuốn sách xuất sắc nhất năm nay.

## Sách được chú ý nhất

**"Đại Việt sử ký toàn thư – Bản dịch mới"** là một trong những tác phẩm được đánh giá cao nhất về công trình dịch thuật, với phần chú giải phong phú và hệ thống hóa tư liệu lịch sử chi tiết.

**"Kinh tế số Việt Nam"** cung cấp góc nhìn toàn diện về hành trình chuyển đổi số của nền kinh tế, được giới chuyên gia đánh giá là tài liệu tham khảo quan trọng.

## Sách thiếu nhi xuất sắc

Hạng mục thiếu nhi năm nay ghi nhận những tác phẩm kết hợp sáng tạo giữa văn học và minh họa, thể hiện sự lớn mạnh của thị trường sách thiếu nhi trong nước.

## Xu hướng nổi bật

Năm nay ghi nhận sự gia tăng đáng kể của các đầu sách về công nghệ, khởi nghiệp và phát triển bản thân – phản ánh nhu cầu thực tiễn của xã hội trong giai đoạn chuyển đổi số mạnh mẽ.
    `.trim(),
  },
  {
    slug: "sach-dien-tu-gioi-tre",
    title:
      "Xu hướng đọc sách điện tử ngày càng phổ biến trong giới trẻ Việt Nam",
    date: "10 Tháng 11, 2021",
    image: "/blog/post-01.jpg",
    excerpt:
      "Sách điện tử đang dần trở thành lựa chọn hàng đầu của giới trẻ nhờ sự tiện lợi và khả năng tiếp cận.",
    content: `
Sự bùng nổ của thiết bị di động và máy đọc sách đã thay đổi thói quen đọc của người trẻ Việt Nam. Sách điện tử không còn là xa lạ mà đang dần chiếm lĩnh thị phần đáng kể.

## Tại sao giới trẻ chọn sách điện tử?

Sự tiện lợi là yếu tố hàng đầu. Với một chiếc điện thoại, người đọc có thể mang theo cả thư viện hàng nghìn cuốn sách, đọc mọi lúc mọi nơi mà không lo thiếu không gian lưu trữ.

Chi phí cũng là một lợi thế lớn. Nhiều đầu sách điện tử có giá thấp hơn đáng kể so với sách in, thậm chí một số nền tảng cung cấp miễn phí hàng nghìn tựa sách kinh điển.

## Thách thức cần vượt qua

Dù tiện lợi, sách điện tử vẫn gặp phải rào cản từ thói quen đọc truyền thống. Nhiều người vẫn thích cảm giác cầm sách thật, lật trang và không bị phân tâm bởi thông báo điện thoại.

## Tương lai của ngành xuất bản

Các nhà xuất bản Việt Nam đang dần thích nghi, đầu tư vào nền tảng số và định dạng đa phương tiện để phục vụ thế hệ độc giả mới.
    `.trim(),
  },
  {
    slug: "bi-quyet-viet-noi-dung",
    title: "Bí quyết viết nội dung thu hút hàng triệu lượt đọc mỗi tháng",
    date: "5 Tháng 11, 2021",
    image: "/blog/post-02.jpg",
    excerpt:
      "Những nguyên tắc viết nội dung được đúc kết từ các tác giả có triệu lượt đọc trên các nền tảng lớn.",
    content: `
Trong thời đại nội dung bùng nổ, việc tạo ra những bài viết thực sự thu hút người đọc trở nên khó khăn hơn bao giờ hết. Tuy nhiên, có những nguyên tắc cốt lõi mà các tác giả thành công đều tuân theo.

## Nguyên tắc 1: Viết cho một người

Dù bài viết nhắm đến hàng triệu người, hãy viết như thể bạn đang nói chuyện với một người cụ thể. Sự cụ thể và cá nhân hóa tạo ra kết nối cảm xúc mạnh mẽ hơn bất kỳ kỹ thuật SEO nào.

## Nguyên tắc 2: Tiêu đề quyết định 80% thành công

Người đọc quyết định có click vào bài viết hay không trong vòng 2 giây. Một tiêu đề tốt phải: rõ ràng về lợi ích, tạo sự tò mò, và trung thực với nội dung.

## Nguyên tắc 3: Đoạn mở đầu phải "móc câu"

Nếu tiêu đề kéo người đọc vào, đoạn mở đầu phải giữ họ lại. Hãy bắt đầu bằng một câu hỏi, con số gây sốc, hoặc câu chuyện ngắn gọn.

## Nguyên tắc 4: Cấu trúc dễ đọc

Sử dụng tiêu đề phụ, đoạn ngắn và danh sách để người đọc có thể lướt qua và chọn phần họ quan tâm. Không ai đọc từng chữ – họ lướt trước, đọc sau.

## Kết luận

Viết hay là kỹ năng có thể rèn luyện. Hãy bắt đầu từ những nguyên tắc cơ bản và không ngừng học hỏi từ phản hồi của độc giả.
    `.trim(),
  },
  {
    slug: "hoi-sach-quoc-te-2021",
    title: "Hội sách quốc tế 2021 – Những điểm nhấn đáng chú ý nhất",
    date: "1 Tháng 11, 2021",
    image: "/blog/post-03.jpg",
    excerpt:
      "Hội sách quốc tế năm nay diễn ra theo hình thức kết hợp trực tiếp và trực tuyến với nhiều điểm nhấn thú vị.",
    content: `
Hội sách quốc tế 2021 diễn ra trong bối cảnh đặc biệt với hình thức kết hợp giữa sự kiện trực tiếp và trực tuyến, thu hút sự tham gia của hàng nghìn nhà xuất bản từ khắp nơi trên thế giới.

## Hình thức tổ chức mới

Lần đầu tiên trong lịch sử, hội sách triển khai nền tảng virtual showroom cho phép độc giả dạo quanh gian hàng, xem và đặt mua sách hoàn toàn trực tuyến. Đây được coi là bước ngoặt trong tổ chức sự kiện sách hậu đại dịch.

## Những nhà xuất bản nổi bật

Hơn 300 nhà xuất bản từ 50 quốc gia tham gia, mang đến hàng chục nghìn đầu sách đa dạng thể loại. Các nhà xuất bản châu Á năm nay đặc biệt gây chú ý với làn sóng sách graphic novel và webtoon được chuyển thể.

## Xu hướng nội dung

Sách về sức khỏe tâm thần, kỹ năng làm việc từ xa và chuyển đổi số dẫn đầu về lượng quan tâm – phản ánh trực tiếp những biến chuyển của xã hội hậu COVID.

## Kỳ vọng cho tương lai

Ban tổ chức cho biết hình thức hybrid sẽ tiếp tục được duy trì trong các kỳ hội sách tiếp theo, hướng đến việc phá vỡ rào cản địa lý trong thế giới xuất bản.
    `.trim(),
  },
];

export const topPosts = allPosts.slice(0, 3);
export const featuredPost = allPosts[0];
export const otherPosts = allPosts.slice(1);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return allPosts.filter((p) => p.slug !== slug).slice(0, count);
}
