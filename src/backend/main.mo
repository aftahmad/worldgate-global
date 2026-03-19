import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";

actor {
  module BlogPost {
    public type Category = {
      #immigrationLaw;
      #citizenship;
      #visa;
      #employment;
      #study;
    };

    public type BlogPost = {
      id : Nat;
      title : Text;
      excerpt : Text;
      content : Text;
      category : Category;
      date : Time.Time;
      author : Text;
    };

    public func compare(p1 : BlogPost, p2 : BlogPost) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  module Consultation {
    public type Booking = {
      name : Text;
      email : Text;
      phone : Text;
      serviceInterest : Text;
      message : Text;
      timestamp : Time.Time;
    };

    public func compare(b1 : Booking, b2 : Booking) : Order.Order {
      Int.compare(b1.timestamp, b2.timestamp);
    };
  };

  module Inquiry {
    public type ContactInquiry = {
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      timestamp : Time.Time;
    };

    public func compare(i1 : ContactInquiry, i2 : ContactInquiry) : Order.Order {
      Int.compare(i1.timestamp, i2.timestamp);
    };
  };

  module Testimonial {
    public type Testimonial = {
      name : Text;
      country : Text;
      rating : Nat8;
      review : Text;
      service : Text;
    };

    public func compare(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Text.compare(t1.name, t2.name);
    };
  };

  var blogPostCount = 0;
  let blogPosts = Map.empty<Nat, BlogPost.BlogPost>();
  let consultations = Map.empty<Text, Consultation.Booking>();
  let inquiries = Map.empty<Text, Inquiry.ContactInquiry>();
  let testimonials = Map.empty<Text, Testimonial.Testimonial>();

  // Public blog operations
  public shared ({ caller }) func createBlogPost(title : Text, excerpt : Text, content : Text, category : BlogPost.Category, author : Text) : async Nat {
    let newId = blogPostCount;
    let post : BlogPost.BlogPost = {
      id = newId;
      title;
      excerpt;
      content;
      category;
      date = Time.now();
      author;
    };

    blogPosts.add(newId, post);
    blogPostCount += 1;
    newId;
  };

  public query ({ caller }) func getBlogPost(id : Nat) : async ?BlogPost.BlogPost {
    blogPosts.get(id);
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost.BlogPost] {
    blogPosts.values().toArray().sort();
  };

  public shared ({ caller }) func createConsultationBooking(name : Text, email : Text, phone : Text, serviceInterest : Text, message : Text) : async () {
    let booking : Consultation.Booking = {
      name;
      email;
      phone;
      serviceInterest;
      message;
      timestamp = Time.now();
    };

    let key = name # "_" # Time.now().toText();
    consultations.add(key, booking);
  };

  public query ({ caller }) func getAllConsultations() : async [Consultation.Booking] {
    consultations.values().toArray().sort();
  };

  public shared ({ caller }) func createContactInquiry(name : Text, email : Text, phone : Text, message : Text) : async () {
    let inquiry : Inquiry.ContactInquiry = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    let key = name # "_" # Time.now().toText();
    inquiries.add(key, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry.ContactInquiry] {
    inquiries.values().toArray().sort();
  };

  // Testimonial management
  public shared ({ caller }) func addTestimonial(name : Text, country : Text, rating : Nat8, review : Text, service : Text) : async () {
    let testimonial : Testimonial.Testimonial = {
      name;
      country;
      rating;
      review;
      service;
    };

    testimonials.add(name, testimonial);
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial.Testimonial] {
    testimonials.values().toArray().sort();
  };
};
