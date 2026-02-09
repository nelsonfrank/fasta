"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  ImageIcon,
  Link2,
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  GripVertical,
  Eye,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface Banner {
  id: string;
  title: string;
  link: string;
  position: string;
  active: boolean;
}

interface FooterLink {
  id: string;
  label: string;
  url: string;
  category: string;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: "draft" | "published";
  date: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const initialBanners: Banner[] = [
  { id: "1", title: "Winter Sale - 50% Off", link: "/sale/winter", position: "Hero", active: true },
  { id: "2", title: "New Tech Arrivals", link: "/new-arrivals", position: "Hero", active: true },
  { id: "3", title: "Free Shipping Over $100", link: "/shipping", position: "Top Bar", active: true },
  { id: "4", title: "Flash Deal - Gaming Accessories", link: "/deals/gaming", position: "Sidebar", active: false },
];

const initialFooterLinks: FooterLink[] = [
  { id: "1", label: "About Us", url: "/about", category: "Company" },
  { id: "2", label: "Contact", url: "/contact", category: "Company" },
  { id: "3", label: "Careers", url: "/careers", category: "Company" },
  { id: "4", label: "Shipping Policy", url: "/shipping-policy", category: "Support" },
  { id: "5", label: "Returns", url: "/returns", category: "Support" },
  { id: "6", label: "FAQ", url: "/faq", category: "Support" },
  { id: "7", label: "Privacy Policy", url: "/privacy", category: "Legal" },
  { id: "8", label: "Terms of Service", url: "/terms", category: "Legal" },
];

const initialBlogPosts: BlogPost[] = [
  { id: "1", title: "Top 10 Gaming Accessories for 2026", author: "Admin", status: "published", date: "Jan 25, 2026" },
  { id: "2", title: "How to Choose the Perfect Monitor", author: "Tech Editor", status: "published", date: "Jan 22, 2026" },
  { id: "3", title: "Upcoming Tech Trends to Watch", author: "Admin", status: "draft", date: "Jan 28, 2026" },
  { id: "4", title: "Best Budget Laptops Guide", author: "Tech Editor", status: "published", date: "Jan 18, 2026" },
];

const initialFAQs: FAQ[] = [
  { id: "1", question: "How do I track my order?", answer: "You can track your order by logging into your account and visiting the Orders section...", category: "Orders" },
  { id: "2", question: "What is your return policy?", answer: "We offer a 30-day return policy for most items in their original condition...", category: "Returns" },
  { id: "3", question: "How long does shipping take?", answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery...", category: "Shipping" },
  { id: "4", question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide. Shipping rates vary by destination...", category: "Shipping" },
  { id: "5", question: "How can I become a seller?", answer: "To become a seller, click on 'Sell on TechHub' and complete the application process...", category: "Sellers" },
];

export default function CMSPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>(initialFooterLinks);
  const [blogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);

  const [bannerDialog, setBannerDialog] = useState(false);
  const [newBanner, setNewBanner] = useState({ title: "", link: "", position: "Hero" });

  const [linkDialog, setLinkDialog] = useState(false);
  const [newLink, setNewLink] = useState({ label: "", url: "", category: "Company" });

  const [faqDialog, setFaqDialog] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", category: "Orders" });

  const handleToggleBanner = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  const handleDeleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddBanner = () => {
    if (newBanner.title && newBanner.link) {
      setBanners((prev) => [
        ...prev,
        { ...newBanner, id: Date.now().toString(), active: true },
      ]);
      setBannerDialog(false);
      setNewBanner({ title: "", link: "", position: "Hero" });
    }
  };

  const handleDeleteLink = (id: string) => {
    setFooterLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const handleAddLink = () => {
    if (newLink.label && newLink.url) {
      setFooterLinks((prev) => [
        ...prev,
        { ...newLink, id: Date.now().toString() },
      ]);
      setLinkDialog(false);
      setNewLink({ label: "", url: "", category: "Company" });
    }
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqs((prev) => [
        ...prev,
        { ...newFaq, id: Date.now().toString() },
      ]);
      setFaqDialog(false);
      setNewFaq({ question: "", answer: "", category: "Orders" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">
            Manage banners, footer links, blog posts, and FAQs
          </p>
        </div>

        <Tabs defaultValue="banners" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="banners" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="footer" className="gap-2">
              <Link2 className="h-4 w-4" />
              Footer Links
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="banners">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Homepage Banners</CardTitle>
                  <CardDescription>Manage promotional banners and hero images</CardDescription>
                </div>
                <Button size="sm" onClick={() => setBannerDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Banner
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {banners.map((banner) => (
                    <div
                      key={banner.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <div className="w-16 h-12 bg-secondary rounded flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{banner.title}</p>
                        <p className="text-sm text-muted-foreground">{banner.link}</p>
                      </div>
                      <Badge variant="outline" className="bg-secondary/50 border-0">
                        {banner.position}
                      </Badge>
                      <Switch
                        checked={banner.active}
                        onCheckedChange={() => handleToggleBanner(banner.id)}
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteBanner(banner.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Footer Links</CardTitle>
                  <CardDescription>Configure navigation links in the website footer</CardDescription>
                </div>
                <Button size="sm" onClick={() => setLinkDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground">Label</TableHead>
                      <TableHead className="text-muted-foreground">URL</TableHead>
                      <TableHead className="text-muted-foreground">Category</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {footerLinks.map((link) => (
                      <TableRow key={link.id} className="border-border hover:bg-secondary/30">
                        <TableCell className="font-medium text-foreground">{link.label}</TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-1">
                            {link.url}
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-secondary/50 border-0">
                            {link.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteLink(link.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Blog Posts</CardTitle>
                  <CardDescription>Create and manage blog content</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-muted-foreground">Title</TableHead>
                      <TableHead className="text-muted-foreground">Author</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id} className="border-border hover:bg-secondary/30">
                        <TableCell className="font-medium text-foreground">{post.title}</TableCell>
                        <TableCell className="text-muted-foreground">{post.author}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              post.status === "published"
                                ? "bg-success/20 text-success border-0"
                                : "bg-warning/20 text-warning border-0"
                            )}
                          >
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{post.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">FAQs</CardTitle>
                  <CardDescription>Manage frequently asked questions</CardDescription>
                </div>
                <Button size="sm" onClick={() => setFaqDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-secondary/50 border-0 text-xs">
                              {faq.category}
                            </Badge>
                          </div>
                          <p className="font-medium text-foreground mb-1">{faq.question}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteFaq(faq.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={bannerDialog} onOpenChange={setBannerDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Banner</DialogTitle>
              <DialogDescription>Create a new promotional banner</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="banner-title">Title</Label>
                <Input
                  id="banner-title"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g., Summer Sale - 40% Off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="banner-link">Link URL</Label>
                <Input
                  id="banner-link"
                  value={newBanner.link}
                  onChange={(e) => setNewBanner((p) => ({ ...p, link: e.target.value }))}
                  placeholder="e.g., /sale/summer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBannerDialog(false)}>Cancel</Button>
              <Button onClick={handleAddBanner}>Add Banner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Footer Link</DialogTitle>
              <DialogDescription>Add a new link to the website footer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="link-label">Label</Label>
                <Input
                  id="link-label"
                  value={newLink.label}
                  onChange={(e) => setNewLink((p) => ({ ...p, label: e.target.value }))}
                  placeholder="e.g., About Us"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={newLink.url}
                  onChange={(e) => setNewLink((p) => ({ ...p, url: e.target.value }))}
                  placeholder="e.g., /about"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setLinkDialog(false)}>Cancel</Button>
              <Button onClick={handleAddLink}>Add Link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={faqDialog} onOpenChange={setFaqDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add FAQ</DialogTitle>
              <DialogDescription>Add a new frequently asked question</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="faq-question">Question</Label>
                <Input
                  id="faq-question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq((p) => ({ ...p, question: e.target.value }))}
                  placeholder="e.g., How do I track my order?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-answer">Answer</Label>
                <Textarea
                  id="faq-answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq((p) => ({ ...p, answer: e.target.value }))}
                  placeholder="Provide a detailed answer..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFaqDialog(false)}>Cancel</Button>
              <Button onClick={handleAddFaq}>Add FAQ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
