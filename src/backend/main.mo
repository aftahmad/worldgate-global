import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

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

  // Blog Post Operations - Admin only for CUD, public for R
  public shared ({ caller }) func createBlogPost(title : Text, excerpt : Text, content : Text, category : BlogPost.Category, author : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };

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

  public query func getBlogPost(id : Nat) : async ?BlogPost.BlogPost {
    // Public access - no authorization needed
    blogPosts.get(id);
  };

  public query func getAllBlogPosts() : async [BlogPost.BlogPost] {
    // Public access - no authorization needed
    blogPosts.values().toArray().sort();
  };

  public shared ({ caller }) func updateBlogPost(id : Nat, title : Text, excerpt : Text, content : Text, category : BlogPost.Category, author : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };

    switch (blogPosts.get(id)) {
      case null { false };
      case (?existing) {
        let updated : BlogPost.BlogPost = {
          id = existing.id;
          title;
          excerpt;
          content;
          category;
          date = existing.date;
          author;
        };
        blogPosts.add(id, updated);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };

    ignore blogPosts.remove(id);
  };

  // Consultation Bookings - Public create, admin-only read
  public shared func createConsultationBooking(name : Text, email : Text, phone : Text, serviceInterest : Text, message : Text) : async () {
    // Public access - guests can book consultations
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view consultations");
    };
    consultations.values().toArray().sort();
  };

  // Contact Inquiries - Public create, admin-only read
  public shared func createContactInquiry(name : Text, email : Text, phone : Text, message : Text) : async () {
    // Public access - guests can submit inquiries
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray().sort();
  };

  // Testimonial Management - User create, public read
  public shared ({ caller }) func addTestimonial(name : Text, country : Text, rating : Nat8, review : Text, service : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add testimonials");
    };

    let testimonial : Testimonial.Testimonial = {
      name;
      country;
      rating;
      review;
      service;
    };

    testimonials.add(name, testimonial);
  };

  public query func getAllTestimonials() : async [Testimonial.Testimonial] {
    // Public access - testimonials are displayed on website
    testimonials.values().toArray().sort();
  };
};
