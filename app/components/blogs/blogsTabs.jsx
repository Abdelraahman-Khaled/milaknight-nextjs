"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/app/api/blog";
import { LanguageContext } from "@/app/context/LanguageContext";

const BlogsTabs = () => {
  const { language, t } = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState("*");
  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { label: t("all_articles"), value: "*" },
    { label: t("branding_and_identity"), value: "Branding" },
    { label: t("web_design_label"), value: "Web_design" },
    { label: t("graphic_design_label"), value: "Graphic_design" },
    { label: t("digital_marketing_label"), value: "digital_marketing" },
    { label: t("e_commerce_label"), value: "e_commerce" },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogsList(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs =
    activeFilter === "*"
      ? blogsList
      : blogsList.filter((blog) => blog.category === activeFilter);


  const handleFilterClick = (e, filterValue) => {
    e.preventDefault();
    setActiveFilter(filterValue);
  };

  return (
    <div className="page-blog">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 margin-top-100">
            <div className="our-Project-nav">
              <ul>
                {filters.map((filter) => (
                  <li key={filter.value}>
                    <Link
                      href="#"
                      className={
                        activeFilter === filter.value ? "active-btn" : ""
                      }
                      onClick={(e) => handleFilterClick(e, filter.value)}
                    >
                      {filter.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          {loading ? (
            <div className="col-12 text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">{t("loading_articles")}</p>
            </div>
          ) : (
            <>
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className={`col-lg-4 col-md-6 ${blog.category}`}
                >
                  {/* <!-- Post Item Start --> */}
                  <div className="post-item">
                    {/* <!-- Post Featured Image Start--> */}
                    <div className="post-featured-image">
                      <figure>
                        <Link
                          href={
                            language === "ar"
                              ? `/blog/${blog.slug_ar}`
                              : `/blog/${blog.slug}`
                          }
                          className="image-anime"
                          data-cursor-text={t("read_article")}
                          style={{
                            display: "block",
                            position: "relative",
                            width: "100%",
                            height: "auto",
                          }}
                        >
                          <Image
                            src={blog.photo_url}
                            alt={
                              language === "ar"
                                ? blog.image_alt_text_ar
                                : blog.image_alt_text_en
                            }
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        </Link>
                      </figure>
                    </div>
                    {/* <!-- Post Featured Image End --> */}

                    {/* <!-- Post Item Body Start --> */}
                    <div className="post-item-body">
                      {/* <!-- Post Item Content Start --> */}
                      <div className="post-item-content">
                        <h3>
                          <Link
                            href={
                              language === "ar"
                                ? `/blog/${blog.slug_ar}`
                                : `/blog/${blog.slug}`
                            }
                          >
                            {language === "ar" ? blog.title_ar : blog.title_en}
                          </Link>
                        </h3>
                      </div>
                      {/* <!-- Post Item Content End --> */}

                      {/* <!-- Post Item Readmore Button Start--> */}
                      <div className="post-item-btn">
                        <Link
                          href={
                            language === "ar"
                              ? `/blog/${blog.slug_ar}`
                              : `/blog/${blog.slug}`
                          }
                        >
                          {language === "ar" ? "اقرأ المزيد" : "Read More"}
                        </Link>
                      </div>
                      {/* <!-- Post Item Readmore Button End--> */}
                    </div>
                    {/* <!-- Post Item Body End --> */}
                  </div>
                  {/* <!-- Post Item End --> */}
                </div>
              ))}

              {filteredBlogs.length === 0 && (
                <div className="col-12 text-center mt-5">
                  <p>{t("no_articles_found")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsTabs;
