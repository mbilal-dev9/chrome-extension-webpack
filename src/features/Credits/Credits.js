import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCredits } from './hooks/useCredits';
import { Box } from '@mui/material';

const Credits = () => {
  const { isLoading, fetchUserMetaData, metaData } = useCredits();

  useEffect(() => {
		fetchUserMetaData();
	},[])

  return (
    <Box  
      sx={(theme)=>({
        padding:'50px 60px',
        height: 'calc(100vh - 215px)',      
        overflow:'auto',      
        fontFamily:"Roboto, sans-serif",
        h2:{ 
          fontSize:'30px', 
          fontWeight:700, 
          lineHeight:'23px', 
          margin:0,
        },
        table:{ 
          display:'flex',
          flexDirection:'column',
          border:'1px solid #C6C6C6', 
          marginTop:'36px',
          borderRadius:'4px',
          padding:'0 16px',
        },
        thead:{
          borderBottom:'1px solid #C6C6C6',
        },
        tr:{
          display:'flex',
          width:'100%',
          borderBottom:'1px solid #C6C6C6',
          '&:last-child':{
            borderBottom:'none',
          }
        },
        th:{
          fontSize:'14px', 
          fontWeight:500, 
          lineHeight:'24px', 
          textAlign:'left !important',
          padding:'16px 31px',
          '&:first-child':{
            width:'30%'
          },
          '&:nth-child(2)':{
            width:'20%'
          },
          '&:last-child':{
            width:'50%'
          }

        },
        td:{ 
          textAlign:'left !important',
          padding:'17px 31px',
          fontSize: '14px',
					fontWeight: 400,
					lineHeight: '21px',
          letterSpacing:'0.25px',
          '&:first-child':{
            width:'30%'
          },
          '&:nth-child(2)':{
            width:'20%'
          },
          '&:last-child':{
            width:'50%'
          }
        },
        a: {
					color: theme.palette.linkColor.main,
					fontSize: '14px',
					fontWeight: 500,
					lineHeight: '21px',
				},
        
      })}>
      {!isLoading && (
        <ReactMarkdown
          children={metaData?.get_free_credits_content}
          remarkPlugins={[remarkGfm]}
        />
      )}
    </Box>
  );
};

export default Credits;
